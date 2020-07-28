import React, { Component } from 'react';
import AppNav from './AppNav';
import { Table,Container,Input,Button,Label, FormGroup, Form} from 'reactstrap';

class Category extends Component {


  

    constructor(props){
        super(props)
  
        this.state = { 
          isLoading :false,
          Categories:[],
          item : this.emptyItem,
         }
  
         this.handleSubmit= this.handleSubmit.bind(this);
         this.handleChange= this.handleChange.bind(this);
  
      } 

      handleChange(event){
        const target= event.target;
        const value= target.value;
        const name = target.name;
        let item={...this.state.item};
        item[name] = value;
        this.setState({item});
        console.log(item);
      }
  

   
 
    async handleSubmit(event){
     
        const item = this.state.item;
      
  
        await fetch(`/api/category`, {
          method : 'POST',
          headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body : JSON.stringify(item),
        });
        
        event.preventDefault();
        this.props.history.push("/category");
      }

    async remove(id){
        await fetch(`/api/category/${id}` , {
          method: 'DELETE' ,
          headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          }

        }).then(() => {
          let updatedCategories = [...this.state.Categories].filter(i => i.id !== id);
          this.setState({Categories : updatedCategories});
        });

    }


    async componentDidMount(){
        const response=await fetch('/api/categories');
        const body = await response.json();
        this.setState({Categories : body , isLoading: false});
    }

    render() { 


  

        const {Categories , isLoading} = this.state;
        if(isLoading) 
            return (<div>Loading...</div>);
        
        return ( 
            
                <div >
                
                    <AppNav/> 
                    <br />
                    <Container className="col-md-4 mb-3">
                    <h2>Categories</h2>

                    <Table className="mt-4">


             
                

                    {
                        Categories.map( category => 

                            <tr id={category.id}>
                       
                            <td>  {category.name}</td>
                            <td><Button size="sm" color="danger" onClick={() => this.remove(category.id)}>Delete</Button></td>

                            </tr>
                        )

                    }
                    </Table>
                    <hr /><br />
                    <h4> Add Category</h4>

                    
                    <Form onSubmit={this.handleSubmit} className="col-md-4 mb-3">
                    <FormGroup >
                        <Label for="name">Title:</Label>
                        <Input type="description" name="name" id="name" 
                        required='true' onChange={this.handleChange}/>
                    
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Add</Button>{' '}
                    </FormGroup>
                    </Form>

                    </Container>
             
                </div>
         );
    }
}
 
export default Category;