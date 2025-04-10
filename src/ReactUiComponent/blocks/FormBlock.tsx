"use client"

import type React from "react"

interface FormField {
  type: "text" | "email" | "textarea" | "select"
  label: string
  placeholder?: string
  required?: boolean
  options?: string[]
}

interface FormBlockProps {
  heading: string
  subheading?: string
  fields?: FormField[]
  submitButtonText?: string
  backgroundColor?: string
  textColor?: string
  accentColor?: string
}

export const FormBlock: React.FC<FormBlockProps> = ({
  heading = "Contact Us",
  subheading = "Fill out the form below and we'll get back to you as soon as possible.",
  fields = [
    {
      type: "text",
      label: "Full Name",
      placeholder: "Enter your full name",
      required: true,
    },
    {
      type: "email",
      label: "Email Address",
      placeholder: "Enter your email address",
      required: true,
    },
    {
      type: "textarea",
      label: "Message",
      placeholder: "Enter your message",
      required: true,
    },
  ],
  submitButtonText = "Send Message",
  backgroundColor = "#ffffff",
  textColor = "#000000",
  accentColor = "#3b82f6",
}) => {
  return (
    <div className="py-16" style={{ backgroundColor, color: textColor }}>
      <div className="container px-4 md:px-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">{heading}</h2>
            {subheading && <p className="mt-2 text-muted-foreground">{subheading}</p>}
          </div>

          <form className="space-y-4">
            {fields.map((field, index) => (
              <div key={index} className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>

                {field.type === "text" && (
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    required={field.required}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                )}

                {field.type === "email" && (
                  <input
                    type="email"
                    placeholder={field.placeholder}
                    required={field.required}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                )}

                {field.type === "textarea" && (
                  <textarea
                    placeholder={field.placeholder}
                    required={field.required}
                    rows={4}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  ></textarea>
                )}

                {field.type === "select" && (
                  <select
                    required={field.required}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">{field.placeholder}</option>
                    {field.options?.map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
              style={{ backgroundColor: accentColor, color: "#ffffff" }}
            >
              {submitButtonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
