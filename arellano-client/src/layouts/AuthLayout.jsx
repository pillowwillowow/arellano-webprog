import { Outlet } from 'react-router-dom';
import authImage from '../assets/images/bibafairy.png';

{/* Enhancement 1 & 2: Make and revise design for the SignInPage | DONE */} 
const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
        <div className="flex items-center justify-center bg-gradient-to-t from-transparent via-[#36591a] to-white p-8 sm:p-8 lg:border-b-0 lg:border-r-2 lg:border-zinc-300 lg:p-16">
          <div className="w-full h-100 max-w-md overflow-hidden p-3 sm:p-4 ">
            <img
              src={authImage}
              alt="beatopia"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        <main className="flex items-center bg-[#afb681] px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;
