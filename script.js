const popupModal=document.getElementById('popupModal');
const popupClose=document.getElementById('popupClose');

window.addEventListener('load',()=>{if(!localStorage.getItem('popupShown')){popupModal.style.display='flex';localStorage.setItem('popupShown','true');}});
popupClose.addEventListener('click',()=>{popupModal.style.display='none';});
window.addEventListener('click',(e)=>{if(e.target===popupModal){popupModal.style.display='none';}});

document.getElementById('contactForm').addEventListener('submit',async function(e){
e.preventDefault();
const formData=new FormData(this);
const submitButton=this.querySelector('.btn-text');
const loadingText=this.querySelector('.btn-loading');
submitButton.style.display='none';
loadingText.style.display='inline-block';

const payload={name:formData.get('name'),email:formData.get('email'),message:formData.get('message'),access_key:'772333d5-fc3b-452d-9e1f-e9bd40c2314e'};

try{
const res=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
const result=await res.json();
const formMessage=document.getElementById('formMessage');
if(result.success){formMessage.textContent='Message sent successfully!';formMessage.style.color='#00E5FF';this.reset();}
else{formMessage.textContent='Failed to send message.';formMessage.style.color='red';}
}catch(err){console.error(err);}
finally{submitButton.style.display='inline-block';loadingText.style.display='none';}
});
