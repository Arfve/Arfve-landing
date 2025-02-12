import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="flex flex-col items-center w-full bg-white">
      <div className="flex flex-col items-center w-full max-w-[1440px] px-6 md:px-[124px] py-8">
        {/* Frame 67 - Top section with exact width and height */}
        <div className="w-[1192px] h-[41.12px] flex flex-row justify-between items-center">
          {/* Left side with logo and navigation */}
          <div className="flex items-center gap-[41px]">
            {/* Logo with exact dimensions */}
            <Link href="/" className="w-[113px] h-[41.12px]">
              <Image
                src="/logo.svg"
                alt="Arfve Logo"
                width={113}
                height={41.12}
                className="w-[113px] h-[41.12px]"
              />
            </Link>
            
            {/* Frame 4 - Navigation Links with exact width and height */}
            <nav className="w-[413px] h-[19px] flex items-center gap-[41px]">
              <Link 
                href="/legacy-1" 
                className="w-[67px] h-[19px] text-base text-black font-inter font-normal leading-[19px]"
              >
                Legacy 1
              </Link>
              <Link 
                href="/innovation" 
                className="w-[124px] h-[19px] text-base text-black font-inter font-normal leading-[19px]"
              >
                Arfve Innovation
              </Link>
              <Link 
                href="/about" 
                className="w-[68px] h-[19px] text-base text-black font-inter font-normal leading-[19px]"
              >
                About us
              </Link>
              <Link 
                href="/faq" 
                className="w-[31px] h-[19px] text-base text-black font-inter font-normal leading-[19px]"
              >
                FAQ
              </Link>
            </nav>
          </div>

          {/* Frame 65 - Social Media Icons */}
          <div className="w-[130px] h-[30px] flex items-center gap-5">
            <Link href="https://youtube.com" className="w-[30px] h-[20.97px] text-black">
              <svg width="30" height="21" viewBox="0 0 30 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M29.0455 3.27626C28.7061 1.99344 27.7089 0.981934 26.4461 0.636347C24.1573 0 15 0 15 0C15 0 5.84276 0 3.55393 0.636347C2.29107 0.981934 1.29393 1.99344 0.954464 3.27626C0.328571 5.60632 0 8.19162 0 10.4977C0 12.8038 0.328571 15.3891 0.954464 17.7192C1.29393 19.002 2.29107 20.0135 3.55393 20.3591C5.84276 20.9954 15 20.9954 15 20.9954C15 20.9954 24.1573 20.9954 26.4461 20.3591C27.7089 20.0135 28.7061 19.002 29.0455 17.7192C29.6714 15.3891 30 12.8038 30 10.4977C30 8.19162 29.6714 5.60632 29.0455 3.27626ZM11.9196 14.9619V6.03354L19.7946 10.4977L11.9196 14.9619Z"/>
              </svg>
            </Link>
            <Link href="https://instagram.com" className="w-[30px] h-[30px] text-black">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 2.7027C19.0547 2.7027 19.5117 2.71875 21.0469 2.78906C22.4766 2.85352 23.2852 3.09961 23.8242 3.30469C24.5391 3.57422 25.043 3.90234 25.5703 4.42969C26.0977 4.95703 26.4258 5.46094 26.6953 6.17578C26.9004 6.71484 27.1465 7.52344 27.2109 8.95312C27.2812 10.4883 27.2973 10.9453 27.2973 15C27.2973 19.0547 27.2812 19.5117 27.2109 21.0469C27.1465 22.4766 26.9004 23.2852 26.6953 23.8242C26.4258 24.5391 26.0977 25.043 25.5703 25.5703C25.043 26.0977 24.5391 26.4258 23.8242 26.6953C23.2852 26.9004 22.4766 27.1465 21.0469 27.2109C19.5117 27.2812 19.0547 27.2973 15 27.2973C10.9453 27.2973 10.4883 27.2812 8.95312 27.2109C7.52344 27.1465 6.71484 26.9004 6.17578 26.6953C5.46094 26.4258 4.95703 26.0977 4.42969 25.5703C3.90234 25.043 3.57422 24.5391 3.30469 23.8242C3.09961 23.2852 2.85352 22.4766 2.78906 21.0469C2.71875 19.5117 2.7027 19.0547 2.7027 15C2.7027 10.9453 2.71875 10.4883 2.78906 8.95312C2.85352 7.52344 3.09961 6.71484 3.30469 6.17578C3.57422 5.46094 3.90234 4.95703 4.42969 4.42969C4.95703 3.90234 5.46094 3.57422 6.17578 3.30469C6.71484 3.09961 7.52344 2.85352 8.95312 2.78906C10.4883 2.71875 10.9453 2.7027 15 2.7027Z"/>
                <path d="M15 7.29492C10.7461 7.29492 7.29492 10.7461 7.29492 15C7.29492 19.2539 10.7461 22.7051 15 22.7051C19.2539 22.7051 22.7051 19.2539 22.7051 15C22.7051 10.7461 19.2539 7.29492 15 7.29492ZM15 20C12.2383 20 10 17.7617 10 15C10 12.2383 12.2383 10 15 10C17.7617 10 20 12.2383 20 15C20 17.7617 17.7617 20 15 20Z"/>
                <path d="M24.8086 6.99219C24.8086 7.98828 24 8.79688 23.0039 8.79688C22.0078 8.79688 21.1992 7.98828 21.1992 6.99219C21.1992 5.99609 22.0078 5.1875 23.0039 5.1875C24 5.1875 24.8086 5.99609 24.8086 6.99219Z"/>
              </svg>
            </Link>
            <Link href="https://linkedin.com" className="w-[30px] h-[30px] text-black">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.7852 0H2.21484C0.993164 0 0 0.96875 0 2.16406V27.8359C0 29.0312 0.993164 30 2.21484 30H27.7852C29.0068 30 30 29.0312 30 27.8359V2.16406C30 0.96875 29.0068 0 27.7852 0ZM8.90625 25.5859H4.45312V11.25H8.90625V25.5859ZM6.67969 9.28125C5.25 9.28125 4.10156 8.13281 4.10156 6.70312C4.10156 5.27344 5.25 4.125 6.67969 4.125C8.10938 4.125 9.25781 5.27344 9.25781 6.70312C9.25781 8.13281 8.10938 9.28125 6.67969 9.28125ZM25.5938 25.5859H21.1406V18.6328C21.1406 16.9453 21.1406 14.7656 18.8086 14.7656C16.4766 14.7656 16.125 16.6172 16.125 18.5156V25.5859H11.6719V11.25H15.9375V13.2188H16C16.6523 12.0703 18.1523 10.8281 20.3906 10.8281C24.8906 10.8281 25.5938 13.875 25.5938 17.8125V25.5859Z"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom section with links and copyright */}
        <div className="flex justify-center items-center gap-3 mt-8">
          <Link 
            href="/privacy" 
            className="text-black hover:text-footer-link-hover transition-colors"
          >
            Privacy policy
          </Link>
          <Link 
            href="/cookies" 
            className="text-black hover:text-footer-link-hover transition-colors"
          >
            Cookie settings
          </Link>
          <span className="text-black">© 2025 Arfve</span>
        </div>
      </div>
    </footer>
  )
} 