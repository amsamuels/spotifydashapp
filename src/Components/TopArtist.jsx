import { useState, useEffect, useCallback } from 'react';
import {
  getUserTopArtistLong,
  getTopArtistsMedium,
  getTopArtistsShort,
} from '../Spotify';
import { catchErrors } from '../utils';
import { Link } from 'react-router-dom';

const TopArtist = () => {
  const [topArtist, setTopArtist] = useState(null);
  const [buttons, setButtons] = useState([
    {
      id: 'long',
      enabled: false,
      frame: (
        <div
          className='text-textwhite font-bold hover:cursor-pointer '
          onClick={() => setRangeData('long')}
        >
          <span className=''> All Time</span>
        </div>
      ),
    },
    {
      id: 'medium',
      enabled: false,
      frame: (
        <div
          className='text-textwhite font-bold hover:cursor-pointer '
          onClick={() => setRangeData('medium')}
        >
          <span className=''>Last 6 Months</span>
        </div>
      ),
     
    },
    {
      id: 'short',
      enabled: false,
      frame: (
        <div
          className='text-textwhite font-bold hover:cursor-pointer '
          onClick={() => setRangeData('short')}
        >
          <span className=''>Last 4 Weeks</span>
        </div>
      ),
    },
  ]);

  const rangesEl = [
    {
      frame: (
        <div
          className='text-textwhite font-bold hover:cursor-pointer '
          onClick={() => setRangeData('long')}
        >
          <span className='truncate'> All Time</span>
        </div>
      ),
    },
    {
      frame: (
        <div
          className='text-textwhite font-bold hover:cursor-pointer '
          onClick={() => setRangeData('medium')}
        >
          <span className='truncate'>Last 6 Months</span>
        </div>
      ),
    },
    {
      frame: (
        <div
          className='text-textwhite font-bold hover:cursor-pointer '
          onClick={() => setRangeData('short')}
        >
          <span className='truncate'>Last 4 Weeks</span>
        </div>
      ),
    },
  ];

  const apiCalls = {
    long: getUserTopArtistLong(),
    medium: getTopArtistsMedium(),
    short: getTopArtistsShort(),
  };
  const fecthArtist = useCallback(async () => {
    const getdata = await getUserTopArtistLong();
    setTopArtist(getdata.data);
  });

  const changeRange = useCallback(async (range) => {
    const dataRange = await apiCalls[range];
    setTopArtist(dataRange.data);
  });

  const setRangeData = (range) => catchErrors(changeRange(range));

  useEffect(() => {
    catchErrors(fecthArtist());
  }, []);

  return (
    <div className='bg-mainBG md:max-w-full max-w-screen-sm	 h-full flex-wrap'>
      <div className='md:py-[60px] md:px-[60px]  py-[30px] px-[30px]'>
      <div className=' flex flex-row md:flex-col justify-between space-x-10 items-center pb-8'>
      <div className='text-textwhite font-bold '>Top Artists</div>
        <div className='flex flex-row space-x-4'>
          {buttons.map(({ id, enabled,frame }, text) => {
            return (
              <div key={id} className={enabled ? '' : ''}>
                <button
                  onClick={() => {
                    setButtons((prevButtons) => {
                      return prevButtons.map((button) => {
                        return {
                          ...button,
                          enabled: button.id === id ? !button.enabled : false,
                        };
                      });
                    });
                  }}
                >
                  <div className={enabled ? 'underline text-textwhite' : ''}>
                   {frame}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
        </div>
        {topArtist ? (
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-[20px] items-center'>
            {topArtist.items.map((artist, i) => {
              const artistID = artist.id;
              return (
                <Link
                  to={`/artist/${artistID}`}
                  key={artist.name}
                  className='flex flex-col items-center justify-between space-x-4 mb-[20px]'
                >
                  <div className='flex md:flex-col border-b py-3 cursor-pointer hover:shadow-md px-2 '>
                    {artist.images.length && artist.images[0].url && (
                      <img
                        src={artist.images[0].url}
                        className='  w-22 h-22 object-cover rounded-lg'
                        alt='Avatar'
                      />
                    )}

                    <div className='align-super items-center  px-2 w-full'>
                      <span className='text-sm text-textwhite  hover:cursor-pointer hover:underline capitalize font-semibold pt-2'>
                        {artist.name}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div>There is no artist </div>
        )}
      </div>
    </div>
  );
};

export default TopArtist;
