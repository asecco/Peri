import Image from "next/image";
import { BASE_URL } from "../utils/constants";

function Cast({ member }) {
    return (
        <div>
            <a href={`/cast?id=${member.id}`} rel="noopener noreferrer">
                <div className="group text-center px-4 md:px-6 xl:px-14 2xl:px-12 py-6 mx-auto transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50 cursor-pointer">
                    <div className="mb-2 sm:px-14 md:px-10 lg:px-2">
                        <Image className="rounded-3xl group-hover:opacity-50" layout='responsive' src={`${BASE_URL}${member.profile_path}`} title={member.name} alt='' height={240} width={160}/>
                    </div>
                    <p className="text-xl md:text-2xl font-bold transition-all duration-100 ease-in-out text-white group-hover:text-red-400 md:line-clamp-2">{member.name}</p>
                    <p className="my-2 text-sm md:text-base font-bold transition-all duration-100 ease-in-out text-white md:line-clamp-2">{member.character}</p>
                </div>
            </a>
        </div>
    );
}

export default Cast;