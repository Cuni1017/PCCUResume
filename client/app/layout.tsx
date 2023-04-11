import "./globals.css";
import Providers from "./Providers";
import Navbar from "./components/Navbar/Navbar";
// import Footer from "./components/Footer/Footer";

const __html = `
/**
 * !!WARNING!!
 * TEMPORARILY WORKAROUND A REACT DEVTOOLS ISSUE https://github.com/facebook/react/issues/25994
 * REMOVE AFTER THE ISSUE IS FIXED
 */
// Save the original __REACT_DEVTOOLS_GLOBAL_HOOK__.inject
const reactDevToolsHookInject = window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject;
// Override the original __REACT_DEVTOOLS_GLOBAL_HOOK__.inject
// This will allow us to intercept and modify incoming injectProfilingHooks
window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function inject(...args) {
  const newArgs = args.map(arg => {
    // Only modify the original arguments when injectProfilingHooks is present
    if (!arg || !arg.injectProfilingHooks) return arg;

    const { injectProfilingHooks: originalInjectProfilingHooks, ...rest } = arg;
    return {
      // Override the original injectProfilingHooks
      // This will allow us to intercept and modify incoming hooks
      injectProfilingHooks(...hooks) {
        const newHooks = hooks.map(hook => {
          // Only modify the original hooks when markComponentSuspended is present
          if (!hook || !hook.markComponentSuspended) return hook;

          // Override the original markComponentSuspended from the hook
          const { markComponentSuspended: orignalMarkComponentSuspended, ...rest2 } = hook;
          return {
            markComponentSuspended(fiber, wakeable, lanes) {
              if (typeof wakeable.then === 'function') {
                return orignalMarkComponentSuspended.call(this, fiber, wakeable, lanes);
              } else {
                // If "wakeable.then" is not a function, log a warning.
                console.warn('React DevTools issue detected and mitigated! See https://github.com/facebook/react/issues/25994 for more information.', { fiber, wakeable, lanes });
              }
            },
            ...rest2
          };
        });
        originalInjectProfilingHooks.apply(this, newHooks);
      },
      ...rest
    };
  });
  return reactDevToolsHookInject.apply(this, newArgs);
};
`;

export const metadata = {
  title: "PCCUResume",
  description: "PCCU's internship platform",
  icons: {
    icon: "/PCCUResume.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="bg-gray-100 min-h-screen w-full min-w-[320px] font-sans">
            <Navbar />
            <main>{children}</main>
            {/* className="md:max-w-[860px] lg:max-w-[1140px] m-auto" */}
            {/* <Footer /> */}
          </div>
        </Providers>
        <script dangerouslySetInnerHTML={{ __html }} />
      </body>
    </html>
  );
}
