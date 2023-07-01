import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from '@heroicons/react/outline';
import FooterItem from "./FooterItem";
import PaginationFooter from './PaginationFooter';
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import { alertParams } from "../../utils/helper";

function Footer({ type, genre, page, totalPages, voteAverage, minYear, maxYear, sortBy }) {
    const router = useRouter();
    const pageRoute = (pageNumber) => {
        if (pageNumber > totalPages) {
            toast.error('No more pages', alertParams);
            return;
        }
        const newPage = Math.max(pageNumber, 1);
        router.push({ pathname: `/${type}/${genre}/${newPage}`, query: { voteAverage: voteAverage, minYear: minYear, maxYear: maxYear, sortBy: sortBy }});
    }

    return (
        <div className='flex flex-row justify-center gap-x-2 mb-14 md:mb-0 items-center h-auto'>
            {type === 'upcoming' ? (
                <>
                <div onClick={() => router.push(`/${type}/${page - 1}`)}><FooterItem title='Back' Icon={ArrowCircleLeftIcon} /></div>
                <PaginationFooter page={page} totalPages={totalPages} setPage={(pageNum) => router.push(`/${type}/${pageNum}`)} />
                <div onClick={() => router.push(`/${type}/${page + 1}`)}><FooterItem title='Next' Icon={ArrowCircleRightIcon} /></div>
                </>
            ) : (
                <>
                {totalPages >= 2 ? (
                    <>
                    <div onClick={() => pageRoute(page - 1)}><FooterItem title='Back' Icon={ArrowCircleLeftIcon} /></div>
                    <PaginationFooter page={page} totalPages={totalPages} setPage={pageRoute} />
                    <div onClick={() => pageRoute(page + 1)}><FooterItem title='Next' Icon={ArrowCircleRightIcon} /></div>
                    </>
                ) :
                <p className='text-4xl lg:text-5xl text-white font-bold my-10'>No More Results</p>
                }
                </>
            )}
        </div>
    );
}

export default Footer;