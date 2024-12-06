'use client';
import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { getRegistrationStatus } from '../../services/notice.service';
import { RegistrationStatus as RegistrationStatusType } from '../../interfaces/IRegistration';
import { cn } from "@/lib/utils";
import { HoverBorderGradient } from './hover-border-gradient';
import { useRouter } from 'next/navigation';
import { sendGTMEvent } from '@next/third-parties/google';

const transition = {
  duration: 0.8,
  ease: "easeInOut",
};


interface StatusCardProps {
  title: string;
  signUp: boolean;
  signIn: boolean;
  signInUrl?: string;
  signUpUrl?:string;
  className?: string;
}
const AnimatedButton = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const [isHovered, setIsHovered] = useState(false);


return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "relative inline-flex items-center justify-center px-6 py-3",
        "rounded-full font-semibold text-white",
        "bg-gradient-to-r from-blue-500 to-purple-600",
        "cursor-pointer overflow-hidden",
        "transition-all duration-300",
        "hover:shadow-lg hover:shadow-blue-500/25"
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500"
        initial={{ x: "100%" }}
        animate={{ x: isHovered ? "0%" : "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      <motion.span
        className="relative z-10"
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </motion.a>
  );
};
const AnimatedButton2 = ({ children }: { children: React.ReactNode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button 
      className={cn(
        "relative inline-flex items-center justify-center px-6 py-3",
        "rounded-full font-semibold text-white",
        "bg-gradient-to-r from-red-900 to-red-600",
        "cursor-pointer overflow-hidden",
        "transition-all duration-300",
        "hover:shadow-lg hover:shadow-orange-500/25"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-900"
        initial={{ x: "100%" }}
        animate={{ x: isHovered ? "0%" : "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      <motion.span
        className="relative z-10"
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
};



const StatusCard: React.FC<StatusCardProps> = ({title,signIn,signUp,signInUrl,signUpUrl,className}) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={cn(
        "bg-white/10 backdrop-blur-md rounded-lg mt-12 p-6 m-4 border border-white/20",
        className
      )}
    >
      <h3 className="text-xl font-bold mb-4 underline text-white">{title}</h3>
      <div className="space-y-2">

        {signUp ? (
          <div className="mt-4">
            <motion.span
              className="text-green-500 text-xl content-center block mb-3"
            >
              Registration Open
            </motion.span>
            <HoverBorderGradient onClick={() =>{
                  sendGTMEvent({ event: 'buttonClicked', section: 'Registration_Status' , activity: title+' signUp'  , link:signUpUrl ? signUpUrl : '' })
                  router.push(signUpUrl ? signUpUrl : '')
            }
          } isDisabled={false} className="opacity-50 cursor-not-allowed text-gray-500 hover:bg-transparent" containerClassName="border-gray-300 bg-gray-100 dark:bg-gray-700" >Register Now</HoverBorderGradient>
          </div>
        ) : (
          <div className="mt-4">
            <motion.span
              className="text-red-500 text-xl block mb-3"
            >
              Registration is close
            </motion.span>
            <HoverBorderGradient isDisabled={true} onClick={() => {
              sendGTMEvent({ event: 'buttonClicked', section: 'Registration_Status' , activity: title+' signUp' , link:signUpUrl ? signUpUrl : '' });
              router.push(signUpUrl ? signUpUrl : '');
            }
          }>Register</HoverBorderGradient>
          </div>
        )}

        {signIn ? (
          <div className="mt-4">
            <motion.span
              className="text-green-500 text-xl content-center block mb-3"
            >
              You can now signIn
            </motion.span>
            <HoverBorderGradient onClick={() => {
              sendGTMEvent({ event: 'buttonClicked', section: 'Registration_Status' , activity: title+' signIn' , link:signInUrl ? signInUrl : '' });
              router.push(signInUrl ? signInUrl : '')
            }
              } isDisabled={false}>SingIn Now</HoverBorderGradient>
          </div>
        ) : (
          <div className="mt-4">
            <motion.span
              className="text-red-500 text-xl block mb-3"
            >
              SignIn is close
            </motion.span>
            <HoverBorderGradient isDisabled={true} onClick={() => {
              sendGTMEvent({ event: 'buttonClicked', section: 'Registration_Status' , activity: title+' signIn' , link:signInUrl ? signInUrl : '' });
              router.push(signInUrl ? signInUrl : '')
            }
              }>SignIn</HoverBorderGradient>
          </div>
        )}


      </div>
    </motion.div>
  );
}


const WaveBackground = () => {
   
    const containerRef = useRef(null);
    
    // Use the container ref for scroll tracking
    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start 50%", "end 30%"]
    });
  // Create transformed values for each wave
  const pathLengths = [
    useTransform(scrollYProgress, [0, 0.8], [0, 1]),
    useTransform(scrollYProgress, [0, 0.7], [0, 1]),
    useTransform(scrollYProgress, [0, 0.6], [0, 1]),
    useTransform(scrollYProgress, [0, 0.5], [0, 1]),
    useTransform(scrollYProgress, [0, 0.4], [0, 1])
  ];

  return (
    <AnimatePresence>
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
    <svg
      viewBox="0 0 1440 890"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute w-full"
      style={{ width:'100%', height:'auto', top:'300px', transform: "translateY(-50%)"  }}
    >
      <motion.path
        d="M0 663C145.5 663 191 666.265 269 647C326.5 630 339.5 621 397.5 566C439 531.5 455 529.5 490 523C509.664 519.348 521 503.736 538 504.236C553.591 504.236 562.429 514.739 584.66 522.749C592.042 525.408 600.2 526.237 607.356 523.019C624.755 515.195 641.446 496.324 657 496.735C673.408 496.735 693.545 519.572 712.903 526.769C718.727 528.934 725.184 528.395 730.902 525.965C751.726 517.115 764.085 497.106 782 496.735C794.831 496.47 804.103 508.859 822.469 518.515C835.13 525.171 850.214 526.815 862.827 520.069C875.952 513.049 889.748 502.706 903.5 503.736C922.677 505.171 935.293 510.562 945.817 515.673C954.234 519.76 963.095 522.792 972.199 524.954C996.012 530.611 1007.42 534.118 1034 549C1077.5 573.359 1082.5 594.5 1140 629C1206 670 1328.5 662.5 1440 662.5"
        stroke="#FFB7C5"
        strokeWidth="2"
        fill="none"
        style={{ pathLength: pathLengths[0] }}
        transition={transition}
      />
      {/* Add similar motion.path elements for other waves, using pathLengths[1] through pathLengths[4] */}
      <motion.path
        d="M0 587.5C147 587.5 277 587.5 310 573.5C348 563 392.5 543.5 408 535C434 523.5 426 526.235 479 515.235C494 512.729 523 510.435 534.5 512.735C554.5 516.735 555.5 523.235 576 523.735C592 523.735 616 496.735 633 497.235C648.671 497.235 661.31 515.052 684.774 524.942C692.004 527.989 700.2 528.738 707.349 525.505C724.886 517.575 741.932 498.33 757.5 498.742C773.864 498.742 791.711 520.623 810.403 527.654C816.218 529.841 822.661 529.246 828.451 526.991C849.246 518.893 861.599 502.112 879.5 501.742C886.47 501.597 896.865 506.047 907.429 510.911C930.879 521.707 957.139 519.639 982.951 520.063C1020.91 520.686 1037.5 530.797 1056.5 537C1102.24 556.627 1116.5 570.704 1180.5 579.235C1257.5 589.5 1279 587 1440 588"
        stroke="#FFDDB7"
        strokeWidth="2"
        fill="none"
        style={{ pathLength: pathLengths[1] }}
        transition={transition}
      />
    
      <motion.path
          d="M0 514C147.5 514.333 294.5 513.735 380.5 513.735C405.976 514.94 422.849 515.228 436.37 515.123C477.503 514.803 518.631 506.605 559.508 511.197C564.04 511.706 569.162 512.524 575 513.735C588 516.433 616 521.702 627.5 519.402C647.5 515.402 659 499.235 680.5 499.235C700.5 499.235 725 529.235 742 528.735C757.654 528.735 768.77 510.583 791.793 500.59C798.991 497.465 807.16 496.777 814.423 499.745C832.335 507.064 850.418 524.648 866 524.235C882.791 524.235 902.316 509.786 921.814 505.392C926.856 504.255 932.097 504.674 937.176 505.631C966.993 511.248 970.679 514.346 989.5 514.735C1006.3 515.083 1036.5 513.235 1055.5 513.235C1114.5 513.235 1090.5 513.235 1124 513.235C1177.5 513.235 1178.99 514.402 1241 514.402C1317.5 514.402 1274.5 512.568 1440 513.235"
          stroke="#B1C5FF"
          strokeWidth="2"
          fill="none"
          initial={{
            pathLength: 0,
          }}
          style={{
            pathLength: pathLengths[2],
          }}
          transition={transition}
        />
        <motion.path
          d="M0 438.5C150.5 438.5 261 438.318 323.5 456.5C351 464.5 387.517 484.001 423.5 494.5C447.371 501.465 472 503.735 487 507.735C503.786 512.212 504.5 516.808 523 518.735C547 521.235 564.814 501.235 584.5 501.235C604.5 501.235 626 529.069 643 528.569C658.676 528.569 672.076 511.63 695.751 501.972C703.017 499.008 711.231 498.208 718.298 501.617C735.448 509.889 751.454 529.98 767 529.569C783.364 529.569 801.211 507.687 819.903 500.657C825.718 498.469 832.141 499.104 837.992 501.194C859.178 508.764 873.089 523.365 891 523.735C907.8 524.083 923 504.235 963 506.735C1034.5 506.735 1047.5 492.68 1071 481.5C1122.5 457 1142.23 452.871 1185 446.5C1255.5 436 1294 439 1439.5 439"
          stroke="#4FABFF"
          strokeWidth="2"
          fill="none"
          initial={{
            pathLength: 0,
          }}
          style={{
            pathLength: pathLengths[3],
          }}
          transition={transition}
        />
        <motion.path
          d="M0.5 364C145.288 362.349 195 361.5 265.5 378C322 391.223 399.182 457.5 411 467.5C424.176 478.649 456.916 491.677 496.259 502.699C498.746 503.396 501.16 504.304 503.511 505.374C517.104 511.558 541.149 520.911 551.5 521.236C571.5 521.236 590 498.736 611.5 498.736C631.5 498.736 652.5 529.236 669.5 528.736C685.171 528.736 697.81 510.924 721.274 501.036C728.505 497.988 736.716 497.231 743.812 500.579C761.362 508.857 778.421 529.148 794 528.736C810.375 528.736 829.35 508.68 848.364 502.179C854.243 500.169 860.624 500.802 866.535 502.718C886.961 509.338 898.141 519.866 916 520.236C932.8 520.583 934.5 510.236 967.5 501.736C1011.5 491 1007.5 493.5 1029.5 480C1069.5 453.5 1072 440.442 1128.5 403.5C1180.5 369.5 1275 360.374 1439 364"
          stroke="#076EFF"
          strokeWidth="2"
          fill="none"
          initial={{
            pathLength: 0,
          }}
          style={{
            pathLength: pathLengths[4],
          }}
          transition={transition}
        />
 
        {/* Gaussian blur for the background paths */}
 
        <path
          d="M0 663C145.5 663 191 666.265 269 647C326.5 630 339.5 621 397.5 566C439 531.5 455 529.5 490 523C509.664 519.348 521 503.736 538 504.236C553.591 504.236 562.429 514.739 584.66 522.749C592.042 525.408 600.2 526.237 607.356 523.019C624.755 515.195 641.446 496.324 657 496.735C673.408 496.735 693.545 519.572 712.903 526.769C718.727 528.934 725.184 528.395 730.902 525.965C751.726 517.115 764.085 497.106 782 496.735C794.831 496.47 804.103 508.859 822.469 518.515C835.13 525.171 850.214 526.815 862.827 520.069C875.952 513.049 889.748 502.706 903.5 503.736C922.677 505.171 935.293 510.562 945.817 515.673C954.234 519.76 963.095 522.792 972.199 524.954C996.012 530.611 1007.42 534.118 1034 549C1077.5 573.359 1082.5 594.5 1140 629C1206 670 1328.5 662.5 1440 662.5"
          stroke="#FFB7C5"
          strokeWidth="2"
          fill="none"
          pathLength={1}
          filter="url(#blurMe)"
        />
        <path
          d="M0 587.5C147 587.5 277 587.5 310 573.5C348 563 392.5 543.5 408 535C434 523.5 426 526.235 479 515.235C494 512.729 523 510.435 534.5 512.735C554.5 516.735 555.5 523.235 576 523.735C592 523.735 616 496.735 633 497.235C648.671 497.235 661.31 515.052 684.774 524.942C692.004 527.989 700.2 528.738 707.349 525.505C724.886 517.575 741.932 498.33 757.5 498.742C773.864 498.742 791.711 520.623 810.403 527.654C816.218 529.841 822.661 529.246 828.451 526.991C849.246 518.893 861.599 502.112 879.5 501.742C886.47 501.597 896.865 506.047 907.429 510.911C930.879 521.707 957.139 519.639 982.951 520.063C1020.91 520.686 1037.5 530.797 1056.5 537C1102.24 556.627 1116.5 570.704 1180.5 579.235C1257.5 589.5 1279 587 1440 588"
          stroke="#FFDDB7"
          strokeWidth="2"
          fill="none"
          pathLength={1}
          filter="url(#blurMe)"
        />
        <path
          d="M0 514C147.5 514.333 294.5 513.735 380.5 513.735C405.976 514.94 422.849 515.228 436.37 515.123C477.503 514.803 518.631 506.605 559.508 511.197C564.04 511.706 569.162 512.524 575 513.735C588 516.433 616 521.702 627.5 519.402C647.5 515.402 659 499.235 680.5 499.235C700.5 499.235 725 529.235 742 528.735C757.654 528.735 768.77 510.583 791.793 500.59C798.991 497.465 807.16 496.777 814.423 499.745C832.335 507.064 850.418 524.648 866 524.235C882.791 524.235 902.316 509.786 921.814 505.392C926.856 504.255 932.097 504.674 937.176 505.631C966.993 511.248 970.679 514.346 989.5 514.735C1006.3 515.083 1036.5 513.235 1055.5 513.235C1114.5 513.235 1090.5 513.235 1124 513.235C1177.5 513.235 1178.99 514.402 1241 514.402C1317.5 514.402 1274.5 512.568 1440 513.235"
          stroke="#B1C5FF"
          strokeWidth="2"
          fill="none"
          pathLength={1}
          filter="url(#blurMe)"
        />
        <path
          d="M0 438.5C150.5 438.5 261 438.318 323.5 456.5C351 464.5 387.517 484.001 423.5 494.5C447.371 501.465 472 503.735 487 507.735C503.786 512.212 504.5 516.808 523 518.735C547 521.235 564.814 501.235 584.5 501.235C604.5 501.235 626 529.069 643 528.569C658.676 528.569 672.076 511.63 695.751 501.972C703.017 499.008 711.231 498.208 718.298 501.617C735.448 509.889 751.454 529.98 767 529.569C783.364 529.569 801.211 507.687 819.903 500.657C825.718 498.469 832.141 499.104 837.992 501.194C859.178 508.764 873.089 523.365 891 523.735C907.8 524.083 923 504.235 963 506.735C1034.5 506.735 1047.5 492.68 1071 481.5C1122.5 457 1142.23 452.871 1185 446.5C1255.5 436 1294 439 1439.5 439"
          stroke="#4FABFF"
          strokeWidth="2"
          fill="none"
          pathLength={1}
          filter="url(#blurMe)"
        />
        <path
          d="M0.5 364C145.288 362.349 195 361.5 265.5 378C322 391.223 399.182 457.5 411 467.5C424.176 478.649 456.916 491.677 496.259 502.699C498.746 503.396 501.16 504.304 503.511 505.374C517.104 511.558 541.149 520.911 551.5 521.236C571.5 521.236 590 498.736 611.5 498.736C631.5 498.736 652.5 529.236 669.5 528.736C685.171 528.736 697.81 510.924 721.274 501.036C728.505 497.988 736.716 497.231 743.812 500.579C761.362 508.857 778.421 529.148 794 528.736C810.375 528.736 829.35 508.68 848.364 502.179C854.243 500.169 860.624 500.802 866.535 502.718C886.961 509.338 898.141 519.866 916 520.236C932.8 520.583 934.5 510.236 967.5 501.736C1011.5 491 1007.5 493.5 1029.5 480C1069.5 453.5 1072 440.442 1128.5 403.5C1180.5 369.5 1275 360.374 1439 364"
          stroke="#076EFF"
          strokeWidth="2"
          fill="none"
          pathLength={1}
          filter="url(#blurMe)"
        />
      <defs>
        <filter id="blurMe">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
        </filter>
      </defs>
    </svg>
    </div>
    </AnimatePresence>
  );
};

const RegistrationStatus = () => {
  const [status, setStatus] = useState<RegistrationStatusType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const result = await getRegistrationStatus();
        if (!result) {
          throw new Error('Failed to fetch registration status');
        }
        setStatus(result);
        console.log(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
        sendGTMEvent({ event:'JS_Error' , error_name:'CompanyDataLoadError', error: err instanceof Error ? err.message : 'An error occurred'});
      } finally{
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-8 w-8 border-b-2 border-white" 
        />
      </div>
    );
  }

  if (error || !status) {
    return (
      <div className="text-red-500 text-center p-4">
        {error || 'Error loading registration status'}
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative max-h-[950px] min-h-[50vw] bg-gradient-to-b from-gray-900 to-blue-950 overflow-auto "
    >
      {/* Header Section */}
      <div className="relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mt-32 mx-auto p-4"
        >
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300">
            Registration Status
          </motion.h2>
          <motion.p 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xs md:text-xl font-normal text-center text-neutral-400 mt-4 max-w-lg mx-auto mb-12">
            Check the current registration status for companies and students
          </motion.p>
        </motion.div>
      </div>

      {/* Background Waves */}
      <WaveBackground />

      {/* Status Cards Section - Now at bottom */}
      <div className="relative z-10 mt-24 pb-8">
        <div className="max-w-4xl mx-auto p-4">
          <div className="grid md:grid-cols-2 gap-4">
            <StatusCard
              title="Company Registration"
              signUp={status.company.signUp}
              signIn={status.company.signIn} 
              signInUrl='https://rur.uom.lk/company/signIn'
              signUpUrl='https://rur.uom.lk/signUp'
              />
            <StatusCard
              title="Student Registration"
              signUp={status.student.signUp}
              signIn={status.student.signIn} 
              signInUrl='https://rur.uom.lk/student/signIn'
              signUpUrl='https://rur.uom.lk/signUp'
              />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationStatus;