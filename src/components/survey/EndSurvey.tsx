import Link from "next/link";

export default function EndSurvey() {
  return (
    <div className="fixed top-0 left-0 flex justify-center w-[100vw] h-[100vh] bg-white z-1 bg-white/30 backdrop-blur-sm ">
      <div className="fixed p-9 top-1/4 flex flex-col gap-1 bg-white border w-[40vw] min-h-[400px] rounded-lg border-solid border-3 border-sky-500">
        <p>
          <strong>Thank You for Completing the Survey!</strong>
        </p>
        <p>
          We truly appreciate your time and insights. Your feedback is shaping
          the future of Arfve and helping us build a product that truly meets
          the needs of our community.
        </p>
        <p>
          <strong>
            Together, we’re redefining how tech should be made—sustainable,
            modular, and built to last.
          </strong>
        </p>
        <p>
          If you signed up for early access, stay tuned for exclusive updates,
          early-bird discounts, and behind-the-scenes looks at the development
          of Legacy 1.
        </p>
        <p>
          Have any additional thoughts? Feel free to reach out at{" "}
          <strong>[Arfves Mail]</strong> —we’d love to hear from you!
        </p>
        <p>
          Thank you for being a part of Arfve. We can’t wait to share what’s
          next with you.
        </p>
        <p>
          <strong>– The Arfve Team</strong>
        </p>
        <Link href="/" passHref>
          <button className="absolute bottom-4 right-4 bg-slate-300 py-2 px-4 rounded-md" data-tracking-id="home-button">
            Home
          </button>
        </Link>
        
      </div>
    </div>
  );
}
