
import { EmotionButton } from "@reach-out/ui-library";


function NotFound() {

  return (
    <div className="page-container">

  
        <EmotionButton emotion_value={"😢"} className={""} useLabel={false}/>

        <h2>404 Error: Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        
    </div>
  );
}

export default NotFound;
