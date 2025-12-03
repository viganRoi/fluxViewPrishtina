import { useEffect } from 'react'
import { getApartmentDetailModalData } from '../features/apartment/ApartmentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SingleCommercial } from '../components'
import { BASE_URL } from '../utils/consts';
import { getApartmentById } from '../features/apartment/ApartmentAPI';
import { useNavigate, useParams } from 'react-router-dom';

const SingleCommercialPage = () => {
    const navigate = useNavigate();
    const commercial = useSelector(getApartmentDetailModalData);
    const dispatch = useDispatch();
    const { id } = useParams();


    useEffect(() => {
        if (id) {
            dispatch(getApartmentById(id));
        }
    }, [dispatch, id]);


    useEffect(() => {
        if (commercial && commercial.rooms) {
            fetch(`${BASE_URL}/api/apartment/get/related?type=${commercial.rooms}`)
                .then(res => res.json())
                .then(data => setRelatedApartments(data))
                .catch(err => console.error('Failed to fetch related apartments', err));
        }
    }, [commercial]);

    return (
        <div className='flex flex-col w-full items-center bg-primary overflow-x-hidden' >
            <div className='bg-black w-full h-64 md:h-96 relative items-center justify-center text-center px-12'>
                <img src="/projektet/assets/images/hero/apartmentBck.png" alt="" className='absolute h-4/7 md:h-full bottom-0 right-0 ' />
                <div className='absolute bottom-6 md:bottom-20 flex items-center gap-6 md:gap-12'>
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-brand transition-all duration-.3s hover:opacity-80 w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center"
                    >
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 7L15 7M1 7L7 13M1 7L7 1" stroke="#00345B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                    <h1 className='text-white text-2xl md:text-7xl font-semibold'><span className='text-white'>Lokali: </span> {commercial.name}</h1>
                </div>
            </div>
            <SingleCommercial
                commercial={commercial}
            />
        </div>
    )
}

export default SingleCommercialPage