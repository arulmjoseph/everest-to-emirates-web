import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

const inquirySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  participate: z.boolean(),
  sponsor: z.boolean(),
  website: z.string().max(200).optional(),
})

export const submitInquiry = createServerFn({ method: 'POST' })
  .inputValidator((data) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { success: true }
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server')
    const { error } = await supabaseAdmin.from('event_inquiries').insert({
      name: data.name,
      email: data.email,
      participate: data.participate,
      sponsor: data.sponsor,
    })
    if (error) {
      console.error('Inquiry save failed:', error.code)
      throw new Error('We could not save your inquiry. Please try again.')
    }
    return { success: true }
  })
