import { Spinner } from "react-bootstrap";

const LoadingSpinner = ({variant='primary'}) => {
    return ( 
        <Spinner animation="border" variant={variant} />
     );
}
 
export default LoadingSpinner;