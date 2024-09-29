const { default: axios } = require("axios");


const API_KEY=process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const axiosClient=axios.create({
    baseURL:'http://localhost:1337/api',
    headers:{
        'Authorization':`Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
    }
})

const getCategory=()=>axiosClient.get('/categories?populate=*');

const getProfessorList=()=>axiosClient.get('/professors?populate=*');

const getProfessorByCategory=(category)=>axiosClient.get('/professors?filters[categories][Name][$in]='+category+"&populate=*")

const getProfessorById=(id)=>axiosClient.get('/professors/'+id+"?populate=*")

const bookAppointment=(data)=>axiosClient.post('appointments',data);

const sendEmail=(data)=>axios.post('/api/sendEmail',data);

const getUserBookingList = (userEmail) => {
    console.log("Fetching bookings for email:", userEmail);
    const url = `/appointments?[filters][Email][$eq]=${userEmail}&populate[professor][populate][0]=Image&populate=*`;
    console.log("Fetching URL:", url);
    return axiosClient.get(url);
};


    const deleteBooking=(id)=>axiosClient.delete('/appointments/'+id)

export default{
    getCategory,
    getProfessorList,
    getProfessorByCategory,
    getProfessorById,
    bookAppointment,
    sendEmail,
    getUserBookingList,
    deleteBooking
}