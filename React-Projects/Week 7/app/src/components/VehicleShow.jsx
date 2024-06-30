import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios';
import React from 'react'

const VehicleShow = ({  _id, description, name, price, quantity, image, setIsLoading, setAlert }) => {


    // vehicle booking function
    const payment = async () => {
        
        // start loading screen
        setIsLoading(true)
        const stripe = await loadStripe("pk_test_51Nyx44SIEnon22odUKod00kpe6ZPnWY8vuyuwOcFVhvlMzVCykybFSAUsqFOf9DZ2vvLOUfUBGxctytvN5f3ngXL00cvdgc4me");

        const body = {
            _id:_id,
            name:name,
            price:price
        }

        axios.post("http://localhost:9876/vehicle/book", body, { withCredentials:true })
        .then((res) => {
            console.log(res.data);
            setIsLoading(false)
            const result = stripe.redirectToCheckout({
                sessionId:res.data.id
            })
            if(result.error){
                console.log(result);
            }
        })
        .catch((err) => {
            setIsLoading(false)
            setAlert({
                text:"Some error Occured",
                show:true,
                color:"red"
            })
        })
        
    }
  return (
    <div 
        className={`vehicle ${quantity <= 0 ? 'disabled' : ''}`} 
    >
        <img  
        className='vehicle-image'
        alt={'Car image of ' + {name}}
        src={`http://localhost:9876/vehicle/${image}`}
        />
        <div className='vehicle-second'>
        <section className='content'>
            <p className='vehicle-tags'>
                Name : {name}
            </p>
            
            <p className='vehicle-tags'>
                Price : ${price} /-
            </p>
            
            <p className='vehicle-tags' >
                Description : {description}
            </p>

            <p className='vehicle-tags' >
                Quantity : {quantity}
            </p>
            
        </section>
        <section className='buttons'>
            <button 
                className='btn green'
                onClick={payment}
            
            >
                Book
            </button>
        </section>
        </div>

    </div>
  )
}

export default VehicleShow