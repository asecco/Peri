import { ReactCusdis } from 'react-cusdis';

function Comment({ title, type, id }) {
    const identifier = `${type}/${id}`;

    return (
        <div className='mx-8'>
            <p className="font-bold text-white text-3xl md:text-4xl 3xl:text-6xl my-10 text-center md:text-left">Community</p>
            <ReactCusdis attrs={{host: 'https://cusdis.com', appId: process.env.NEXT_PUBLIC_CUSDIS, pageId: identifier, pageTitle: title}}/>
        </div>
  );
}

export default Comment;