import React from 'react';

const Login = () => {
  return (
    <div className='bg-gray-900 fixed w-full  h-full top-0 left-0 z-30'>
      <div className='container p-5 mx-auto  flex items-center justify-between '>
        <div className='flex mx-auto'>
          <button className='border-2 rounded-full bg-green-600 border-green-700 px-6 py-2 mx-2 my-4 '>
            <a
              className='font-hero text-lg text-white underline underline-offset-1'
              href='http://localhost:8888/login'
            >
              Login to Spotify
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
