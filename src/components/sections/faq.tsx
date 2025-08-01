'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: "How long does dental implant treatment take?",
    answer: "The timeline varies depending on individual cases. Typically, the entire process takes 3-6 months, including healing time. However, with our All-on-4 technique, you can receive temporary teeth on the same day."
  },
  {
    question: "Are dental implants painful?",
    answer: "The procedure is performed under local anesthesia, ensuring you feel no pain during treatment. Post-operative discomfort is minimal and manageable with prescribed medication."
  },
  {
    question: "How long do dental implants last?",
    answer: "With proper care and maintenance, dental implants can last a lifetime. We provide comprehensive aftercare instructions and lifetime warranty on our premium implants."
  },
  {
    question: "What is the success rate of dental implants?",
    answer: "Our clinic maintains a 98% success rate for dental implants, thanks to our experienced team and state-of-the-art technology."
  },
  {
    question: "Can I get dental implants if I have bone loss?",
    answer: "Yes, we offer advanced bone grafting procedures and techniques like All-on-4 that can work even with minimal bone density."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 sm:py-32 bg-black relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-thin text-white uppercase tracking-tight mb-6"
            style={{ 
              fontFamily: '"Inter", sans-serif',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 15px rgba(0,0,0,0.5)',
              willChange: 'auto'
            }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto"
            style={{ 
              fontFamily: '"Inter", sans-serif', 
              fontWeight: '300',
              willChange: 'auto'
            }}
          >
            Find answers to common questions about our dental implant treatments
          </p>
        </div>

        <div className="space-y-4" style={{ willChange: 'auto' }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 transform-gpu"
              style={{ willChange: 'auto' }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <h3 className="text-lg font-light text-white pr-8"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  {faq.question}
                </h3>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: openIndex === index ? '500px' : '0',
                  opacity: openIndex === index ? 1 : 0,
                  willChange: 'auto'
                }}
              >
                <div className="px-6 pb-5 pt-1">
                  <p className="text-gray-300 leading-relaxed"
                    style={{ 
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: '300'
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}