import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import { Table,Container,Input,Button,Label, FormGroup, Form} from 'reactstrap';
import Moment from 'react-moment';


class Expsenses extends Component {

 
    emptyItem = {
        description : '' ,
        expensedate : new Date(),
        location : '',
        category : {id:0},
        price: 0
    }

    
    constructor(props){
      super(props)

      this.state = { 
        isLoading :false,
        Categories:[],
        Expsenses : [],
        date :new Date(),
        item : this.emptyItem,
       }

       this.handleSubmit= this.handleSubmit.bind(this);
       this.handleChange= this.handleChange.bind(this);
       this.handleDateChange= this.handleDateChange.bind(this);
       this.handleDropdownChange = this.handleDropdownChange.bind(this);

    } 

    async handleSubmit(event){
     
      const item = this.state.item;
    

      await fetch(`/api/expenses`, {
        method : 'POST',
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(item),
      });
      
      event.preventDefault();
      this.props.history.push("/expenses");
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


    handleDateChange(date){
      let item={...this.state.item};
      item.expensedate= date;
      this.setState({item});
    
    }


    handleDropdownChange(e){
      let item = {...this.state.item};
      item.category.id = e.target.value;
      this.setState({item});

      console.log(this.state);

   }



    async remove(id){
        await fetch(`/api/expenses/${id}` , {
          method: 'DELETE' ,
          headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          }

        }).then(() => {
          let updatedExpenses = [...this.state.Expsenses].filter(i => i.id !== id);
          this.setState({Expsenses : updatedExpenses});
        });

    }


    async componentDidMount() {
 
     

        const response= await fetch('/api/categories');
        const body= await response.json();
        this.setState({Categories : body , isLoading :false});


        const responseExp= await fetch('/api/expenses');

        const bodyExp = await responseExp.json();
        this.setState({Expsenses : bodyExp , isLoading :false});
        console.log(bodyExp);

    }





    render() { 
        const title =<h3>Add Expense</h3>;
        const {Categories} =this.state;
        const {Expsenses,isLoading} = this.state;
        

        if (isLoading)
            return(<div>Loading....</div>)
        


        let optionList  =
                Categories.map( (category) =>
                    <option value={category.id} key={category.id}>
                                {category.name} 
                    </option>
                )

        let rows=
            Expsenses.map( expense =>
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.location}</td>
                <td><Moment date={expense.expensedate} format="YYYY/MM/DD"/></td>
                <td>{expense.category.name}</td>
                <td>{expense.price}</td>

                <td><Button size="sm" color="danger" onClick={() => this.remove(expense.id)}>Delete</Button></td>

              </tr>


            )
      
            const getTotalCosts = () => {
              return Expsenses.reduce((total, item) => {
                return total + Number(item.price);
              }, 0);
            };
          

        return (
            <div>
                <AppNav/>

                <Container> <br />
                <h3>Expense List</h3>
                <Table className="mt-4">
                <thead>
                  <tr>
                    <th width="30%">Description</th>
                    <th width="10%">Location</th>
                    <th> Date</th>
                    <th> Category</th>                 
                       <th> Price</th>

                    <th width="10%">Action</th>
                  </tr>
                </thead>
                <tbody>
                   {rows}
                </tbody>

                </Table>

                <h3 align="right">Total Price: ${getTotalCosts()} </h3>      
                        



              <hr /><br />


                    {title}
                    
                    <Form onSubmit={this.handleSubmit} className="col-md-4 mb-3">
                    <FormGroup >
                        <Label for="description">Title:</Label>
                        <Input type="description" name="description" id="description" 
                        required='true' onChange={this.handleChange}/>
                    
                    </FormGroup>

                    <FormGroup>
                        <Label for="category" >Category:</Label>{" "}
                
                    
                        <select value={this.state.item.category.id} onChange={this.handleDropdownChange} isSearchable required>
                        <option value='0' disabled>Select</option>
                            {optionList}
                        </select>

                    </FormGroup>

                    <FormGroup>
                        <Label for="city">Date:</Label> {" "}
                        <DatePicker    selected={this.state.item.expensedate}  onChange={this.handleDateChange} required='true'/>
                    </FormGroup>

          
                        <FormGroup>
                        <Label for="location">Location:</Label>
                        <Input type="text" name="location" id="location" required='true' onChange={this.handleChange}/>
                        </FormGroup>
                      
                   

                        <FormGroup >
                        <Label for="location">Price</Label>
                        <Input type="number" name="price" id="price" onChange={this.handleChange} required='true'/>
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
 
export default Expsenses;