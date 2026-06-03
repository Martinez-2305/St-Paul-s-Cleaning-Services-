import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { firstName, lastName, email, phone, service, message } = await req.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { error: dbError } = await supabase
      .from('submissions')
      .insert({ first_name: firstName, last_name: lastName, email, phone, service, message })

    if (dbError) throw dbError

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: Deno.env.get('FROM_EMAIL'),
        to: [Deno.env.get('TO_EMAIL')],
        reply_to: email,
        subject: `New Quote Request — ${firstName} ${lastName}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e4e9ee;border-radius:8px;">
            <h2 style="color:#243A5E;margin-bottom:24px;">New Quote Request</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#667;font-size:13px;width:130px;">Name</td><td style="padding:8px 0;font-weight:600;">${firstName} ${lastName}</td></tr>
              <tr><td style="padding:8px 0;color:#667;font-size:13px;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#243A5E;">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#667;font-size:13px;">Phone</td><td style="padding:8px 0;">${phone || '—'}</td></tr>
              <tr><td style="padding:8px 0;color:#667;font-size:13px;">Service</td><td style="padding:8px 0;">${service || '—'}</td></tr>
            </table>
            ${message ? `<div style="margin-top:16px;padding:16px;background:#f4f6f7;border-radius:6px;"><p style="color:#667;font-size:12px;margin:0 0 6px;">Message</p><p style="margin:0;">${message.replace(/\n/g, '<br>')}</p></div>` : ''}
            <p style="margin-top:24px;font-size:12px;color:#aaa;">Submitted via stpaulscleaning.co.uk</p>
          </div>
        `,
      }),
    })

    if (!resendRes.ok) {
      const err = await resendRes.json()
      throw new Error(`Resend: ${JSON.stringify(err)}`)
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
