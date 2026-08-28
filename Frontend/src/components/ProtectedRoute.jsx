import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function ProtectedRoute({ children, role }) {
    const {loading, user} = useAuth()


    if(loading) {
        return 
        <Flex align="center" gap="medium">
            <Spin indicator={<LoadingOutlined style={{color: '#1c3144' }} spin />} size="large" />
        </Flex>
    }

    if (!user) {
        return <Navigate to="/sign-in" />;
    }

    if(role && user.role != role){
        return <Navigate to="/" />;
    }

    return children;
}


export default ProtectedRoute;