import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS='SET_ORDERS'


export const fetchOrders=()=>{
  return async( dispatch,getState)=>{
    const userId=getState().auth.userId;
    try{
    const response= await fetch(`https://mystore-46e32.firebaseio.com/orders/${userId}.json`);


    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData=await response.json();
    const loadrders=[];
    for(const key in resData){
      loadrders.push(
         new Order ( key,
             resData[key].cartItems,
             resData[key].totalAmount,
             new Date( resData[key].date))
        
        )
    }

    dispatch({type:SET_ORDERS,orders:loadrders})
  }catch(err){
     throw err;
  }
  }

}




export const addOrder = (cartItems, totalAmount) => {
  return async ( dispatch,getState)=>{
    const userId=getState().auth.userId;
    const token=getState().auth.token
    const date = new Date();

    const response = await fetch(`https://mystore-46e32.firebaseio.com/orders/${userId}.json?auth=${token}`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application.json'
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date.toISOString()
      })
    });

    if(!response.ok){
      throw new Error('sonme thing worng!')
    }
  
    const resData=await response.json();
    dispatch({
      type: ADD_ORDER,
      orderData: {id:resData.name, items: cartItems, amount: totalAmount, date: date }
    });
  }
};
