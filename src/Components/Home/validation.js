const validateEmail = (email) => {
    const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailPattern.test(email)
};

const validateAvailability=(entry)=>{
  if(!entry){
     return false
  }
  return true;
}

export {validateEmail,validateAvailability}