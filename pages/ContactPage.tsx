
import React, { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { FormField } from '../components/FormField';
import { PROFESSIONAL_EMAIL, SOCIAL_LINKS } from '../constants';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    document.title = "Contact Us | Private Lives Matter";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Get in touch with Private Lives Matter. Have questions about our festival wear or hidden pocket designs? We'd love to hear from you!");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormState(prevState => ({ ...prevState, [id]: value }));
    if (errors[id as keyof FormErrors]) {
      setErrors(prevErrors => ({ ...prevErrors, [id]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formState.name.trim()) newErrors.name = 'Name is required.';
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formState.message.trim()) newErrors.message = 'Message is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);
    // Simulate API call
    console.log('Form submitted to:', PROFESSIONAL_EMAIL, formState);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormState({ name: '', email: '', message: '' });
      // setErrors({}); // Clear errors after successful submission
    }, 1500);
  };

  return (
    <div className="container mx-auto py-8 md:py-12">
      <h1 className="font-poppins text-3xl sm:text-4xl font-bold text-center mb-10 md:mb-16">Get in Touch</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {/* Contact Form */}
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl animate-fade-in-left">
          <h2 className="font-poppins text-2xl font-semibold mb-6">Send Us a Message</h2>
          {submitSuccess && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 border border-green-300 rounded-md">
              Thanks for your message! We'll get back to you soon.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              id="name"
              label="Full Name"
              value={formState.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              error={errors.name}
            />
            <FormField
              id="email"
              label="Email Address"
              type="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              error={errors.email}
            />
            <FormField
              id="message"
              label="Your Message"
              value={formState.message}
              onChange={handleChange}
              placeholder="Let us know how we can help..."
              isTextArea
              required
              error={errors.message}
            />
            <div>
              <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isSubmitting} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </div>

        {/* Contact Info & Socials */}
        <div className="animate-fade-in-right animation-delay-300">
          <h2 className="font-poppins text-2xl font-semibold mb-6">Contact Information</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Have questions or just want to share some good vibes? We'd love to hear from you!
            </p>
            <p>
              <strong>Email:</strong> <a href={`mailto:${PROFESSIONAL_EMAIL}`} className="text-accent hover:underline">{PROFESSIONAL_EMAIL}</a>
            </p>
            <p>
              While we're primarily online, our creative studio is based in the heart of the vibrant cosmos (aka, we ship from a cool spot!).
            </p>
          </div>

          <h3 className="font-poppins text-xl font-semibold mt-10 mb-4">Connect With Us</h3>
          <div className="flex space-x-5">
            {SOCIAL_LINKS.map(social => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-accent transition-colors transform hover:scale-110"
                title={social.name}
              >
                <social.Icon className="h-8 w-8" />
              </a>
            ))}
          </div>
        </div>
      </div>
       <style>{`
        @keyframes fade-in-left {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-right {
          0% { opacity: 0; transform: translateX(20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-left { animation: fade-in-left 0.6s ease-out forwards; }
        .animate-fade-in-right { animation: fade-in-right 0.6s ease-out forwards; }
        .animation-delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
};
    