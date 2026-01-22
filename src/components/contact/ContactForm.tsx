'use client'

import React, { useState } from 'react'
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

interface ContactFormProps {
  formId?: string
}

export function ContactForm({ formId }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formId) {
      setStatus('error')
      setErrorMessage('Form ID belum dikonfigurasi. Silakan hubungi admin.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      // Structure the data according to how Payload Form Builder expects it
      // Based on the fields we planned: name, email, subject, message
      const submissionData = [
        { field: 'name', value: formData.name },
        { field: 'email', value: formData.email },
        { field: 'subject', value: formData.subject },
        { field: 'message', value: formData.message },
      ]

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || ''}/api/form-submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form: formId,
          submissionData: submissionData,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.errors?.[0]?.message || 'Gagal mengirim pesan')
      }

      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err: any) {
      console.error('Submission error:', err)
      setStatus('error')
      setErrorMessage(err.message || 'Terjadi kesalahan saat mengirim pesan.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-emerald-50 p-8 text-center border border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-800 dark:text-emerald-200">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-foreground">Pesan Terkirim!</h3>
        <p className="mb-6 text-muted-foreground">
          Terima kasih telah menghubungi kami. Tim kami akan segera merespons pesan Anda.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="rounded-xl bg-emerald-600 px-6 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
        >
          Kirim Pesan Lain
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!formId && (
        <div className="rounded-xl bg-amber-50 p-4 text-amber-800 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-200 flex items-start gap-3 text-sm">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div>
            <strong>Konfigurasi Diperlukan:</strong> ID Form belum diset. Admin perlu membuat form
            di dashboard dan memasukkan ID-nya di sini.
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="rounded-xl bg-red-50 p-4 text-red-800 border border-red-200 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200 text-sm">
          <p className="font-semibold">Gagal mengirim pesan:</p>
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold text-foreground/80">
            Nama Lengkap
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 text-foreground"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-foreground/80">
            Alamat Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 text-foreground"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-semibold text-foreground/80">
          Subjek
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 text-foreground"
          placeholder="Tujuan pesan Anda..."
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-semibold text-foreground/80">
          Pesan
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 text-foreground resize-none"
          placeholder="Tulis pesan Anda di sini..."
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting' || !formId}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Mengirim...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Kirim Pesan
          </>
        )}
      </button>
    </form>
  )
}
