import { useEffect, FC } from 'react';
import clsx from 'clsx';
import { DrawerProps } from './drawer.types';
import NewsDetails from '../newsDetails/newsDetails';

const NewsCardDrawer: FC<DrawerProps> = ({ open, setOpen, selectedNews }) => {
  useEffect(() => {
    document.body.classList.add('overflow-y-hidden');
    return () => {
      document.body.classList.remove('overflow-y-hidden');
    };
  }, []);

  return (
    <div
      id="dialog-right"
      className="relative z-10 max-w-[500px]"
      role="dialog"
      aria-modal="true"
      data-testid="drawer"
    >
      {/* Background Overlay */}
      <div
        data-testid="overlay"
        className={clsx(
          'fixed inset-0 bg-gray-500 bg-opacity-75 transition-all',
          {
            'opacity-100 duration-500 ease-in-out visible': open
          },
          { 'opacity-0 duration-500 ease-in-out invisible': !open }
        )}
        onClick={() => setOpen(false)} // Close drawer on clicking the overlay
      ></div>

      {/* Drawer Content */}
      <div
        className={clsx({ 'fixed inset-0 overflow-hidden': open })}
        onClick={(event) => event.stopPropagation()} // Prevent closing on click inside drawer
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed max-w-full inset-y-0 right-0">
            <div
              className={clsx(
                'pointer-events-auto relative w-full h-full transform transition ease-in-out duration-500',
                { 'translate-x-full': !open },
                { 'translate-x-0': open }
              )}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <div className="flex flex-col h-full overflow-y-scroll bg-white p-5 md:p-10 lg:p-20 shadow-xl bg-blue-400 rounded-lg">
                <div className="max-w-[500px]">
                  {/* Close Button */}
                  <div className="absolute top-0 right-0 flex pt-4 pr-4 lg:pt-8 lg:pr-8 duration-500 ease-in-out data-closed:opacity-0">
                    <button
                      type="button"
                      data-testid="drawer-close"
                      onClick={() => setOpen(false)}
                      className="relative rounded-md text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden"
                      aria-label="Close Drawer" // Added accessibility label
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#222"
                        aria-hidden="true"
                        className="w-[24px] h-[24px]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  {/* NewsDetails */}
                  <NewsDetails {...selectedNews} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCardDrawer;
