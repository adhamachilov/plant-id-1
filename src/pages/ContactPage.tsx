import React from 'react';
import { Phone, Mail, Clock } from 'lucide-react';
import ContactCard from '../components/ContactCard';
import AnimatedElement from '../components/AnimatedElement';
import FAQ from '../components/FAQ';

const ContactPage: React.FC = () => {
  const contactDetails = [
    {
      icon: <Phone className="h-6 w-6 text-emerald-500" />,
      title: 'Phone Number',
      details: '*Not Available Yet*'
    },
    {
      icon: <Mail className="h-6 w-6 text-emerald-500" />,
      title: 'Email Address',
      details: 'adhamachilovusa@gmail.com'
    },
    {
      icon: <Clock className="h-6 w-6 text-emerald-500" />,
      title: 'Working Hours',
      details: 'Monday - Friday: 9am to 5pm'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <AnimatedElement>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 text-center">
            Get in <span className="text-emerald-400">Touch</span>
          </h1>
          <p className="text-emerald-100 text-center max-w-2xl mx-auto mb-12">
            Have questions about plant care, identification, or just want to say hello? 
            We're here to help with all your botanical inquiries.
          </p>
        </AnimatedElement>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-8">
          <AnimatedElement delay={0.2} className="flex flex-col space-y-8">
            {/* Contact Details */}
            <div className="bg-emerald-950/50 backdrop-blur-md rounded-xl p-6 shadow-xl">
              <h2 className="text-2xl font-semibold text-white mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactDetails.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-3 bg-emerald-900/60 rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-emerald-300 font-medium">{item.title}</h3>
                      <p className="text-white">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-emerald-950/50 backdrop-blur-md rounded-xl p-6 shadow-xl">
              <FAQ items={[
                {
                  question: "How accurate is the plant identification?",
                  answer: "Our plant identification technology has a 95% accuracy rate for common plant species. The accuracy improves with clearer images and continues to get better as our AI learns from more data."
                },
                {
                  question: "Is Plant-ID free to use?",
                  answer: "Yes! Plant-ID is completely free to use with no sign-up required. Just upload a photo and get instant results. More features may be added in the future, but the core identification tool will always stay free."
                },
                {
                  question: "Is there a mobile app available?",
                  answer: "Currently, PlantID is available as a web application optimized for both desktop and mobile browsers. A dedicated mobile app is in development and will be released soon."
                },
                {
                  question: "How do I take the best photo for identification?",
                  answer: "For best results, take clear, well-lit photos that show distinctive features of the plant such as leaves, flowers, or fruit. Try to avoid shadows and make sure the plant fills most of the frame."
                },
                {
                  question: "Can I use PlantID offline?",
                  answer: "The core identification features require an internet connection to access our AI models. However, we're working on a feature to allow browsing of saved plants and care instructions offline."
                },
                {
                  question: "How do I report a misidentification?",
                  answer: "If you believe a plant has been misidentified, please use the feedback form on the identification result page or contact us directly through the form on this page."
                }
              ]} />
            </div>
          </AnimatedElement>

          <AnimatedElement delay={0.4}>
            {/* Contact Card */}
            <ContactCard />
          </AnimatedElement>
        </div>


      </div>
    </div>
  );
};

export default ContactPage;
