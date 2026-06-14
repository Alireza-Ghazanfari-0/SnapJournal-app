import { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../ui/loading";

function ContactUsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function contactHandler(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const textMessage = formData.get("message");

    try {
      setIsSubmitting(true);
      // console.log(name, email, textMessage);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, textMessage }),
      });
      // console.log("aa");

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || " error in fetch");
      }
      toast.success(data.message);
      form.reset();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full bg-gray-100 dark:bg-stone-600 py-10 px-4">
      <form
        onSubmit={contactHandler}
        className="bg-amber-50 dark:bg-stone-400 w-full max-w-lg mx-auto rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300"
      >
        <p className="text-center text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-700 font-sans">
          How Can I Help You?
        </p>

        <div className="flex flex-col gap-y-6 mt-6">
          {/* نام و ایمیل در یک ردیف */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-900 mb-1">
                Your Name:
              </label>
              <input
                required
                name="name"
                type="text"
                placeholder="Alireza"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-900 mb-1">
                Your Email:
              </label>
              <input
                required
                name="email"
                type="email"
                placeholder="Alireza.ghazanfari@yahoo.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* پیام */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-900 mb-1">
              Your Message:
            </label>
            <textarea
              required
              name="message"
              rows={4}
              placeholder="How can I help you?"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition resize-y"
            />
          </div>

          {isSubmitting ? (
            <div className="w-full text-center bg-emerald-100 font-semibold py-2.5 rounded-lg transition   ">
              is submitting ...
            </div>
          ) : (
            <button
              type="submit"
              className="w-full cursor-pointer bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
            >
              Send Private Message
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ContactUsForm;
