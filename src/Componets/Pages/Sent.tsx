export default function Sent() {
  const sentdata =  localStorage.getItem("savedinputvalue") 
  console.log(sentdata,"--------Getting sent data");
  
  return (
    <div>Sent-section</div>
  )
}
