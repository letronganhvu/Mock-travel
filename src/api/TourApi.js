import Apis from './Apis';

const url = "/Employees"


const tour = () => {

    return Apis.get(url);
};



// export
const tourApi = { tour }
export default tourApi;