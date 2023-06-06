import { UsersData } from "./UserData";
import { useState } from "react";

const DetailsUser = () => {
    const [data, setData] = useState(UsersData);
    // getUser = () =>{
    //     if(this.props.match.params.id){
    //         const res = this.context.UsersData;
    //         const data = res.filter(item =>{
    //             return item.id === this.props.match.params.id
    //         })
    //         this.setState({UsersData: data})
    //     }};
    const {UsersData} = this.state;
    const {addCart} = this.context;
    return (
        <>
            {UsersData.map(item =>(
                    <div className="details" key={item.id}>
                        <img src={item.imgsrc} alt=""/>
                        <div className="box">
                            <div className="row">
                                <h2>{item.id}</h2>
                                <span>{item.userName}</span>
                                <span>{item.fullName}</span>
                                <span>{item.sdt}</span>
                                <span>{item.mail}</span>
                            </div>
                            {/* <Link to="/cart" className="cart" onClick={() => addCart(item.id)}>
                                Add to cart
                            </Link> */}
                        </div>   
                    </div>  ))} </> 
    )
}
export default DetailsUser


        
       