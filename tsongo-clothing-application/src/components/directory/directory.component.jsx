import CategoryItem from '../category-item/category-item.component';
import './directory.styles.scss'
const Directory=({categories})=> {
return(
<div>
<div className="directory-container">
{categories.map((category)=>(
 <CategoryItem key={category.id} category={category} /> 
))}<br/>
</div>
<div className='develloper'><center><p>Develloped by :  IR SANTOS USENI TSONGO</p></center></div>
</div>
)
}
export default Directory