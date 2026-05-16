function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Help Center</h1>
        <p className="mb-6 text-slate-600 leading-7">
          Welcome to our help center. If you need assistance with orders,
          payments, product returns, or account settings, we are here to help.
          Browse the support topics, or use the contact details below to reach
          our team.
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Phone Support
            </h2>
            <p className="text-slate-700">Call us anytime from 8am to 8pm:</p>
            <ul className="mt-3 space-y-2 text-slate-600">
              <li>
                Customer support:{" "}
                <span className="font-semibold">+1 (800) 123-4567</span>
              </li>
              <li>
                Order inquiries:{" "}
                <span className="font-semibold">+1 (800) 234-5678</span>
              </li>
              <li>
                Technical help:{" "}
                <span className="font-semibold">+1 (800) 345-6789</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Email Support
            </h2>
            <p className="text-slate-700">
              Send us a message and we’ll reply within 24 hours:
            </p>
            <ul className="mt-3 space-y-2 text-slate-600">
              <li>
                General help:{" "}
                <span className="font-semibold">help@jumiaapp.com</span>
              </li>
              <li>
                Order support:{" "}
                <span className="font-semibold">orders@jumiaapp.com</span>
              </li>
              <li>
                Account questions:{" "}
                <span className="font-semibold">accounts@jumiaapp.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Quick tips
            </h2>
            <p className="text-slate-600 leading-7">
              Check your order status, manage payment methods, and update your
              address through your account page. If you still need help, contact
              us using the phone or email options above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
