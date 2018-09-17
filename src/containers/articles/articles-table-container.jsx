import React, { Component } from 'react';
import { bindActionCreators  } from 'redux';
import { connect } from 'react-redux';
import { getUsers, createUser, deleteUser } from '../../redux/users/user-actions'
import ModalComponent from '../../components/modal/modal-component';
import ProfileFormComponent from '../../components/profile/profile-form-component';
import BootstrapTable from 'react-bootstrap-table-next';

const mockData = [
    {
        "_id": "5b5e53e19bf56042fc8281d9",
        "code": 33253203,
        "category": {
            "_id": "5b5e53dc9bf56042fc82771b",
            "description": "-",
            "__v": 0
        },
        "description": "ABRAZ.PVC.SAL.ROSC.D/BULON 110x13mm"
    },
    {
        "_id": "5b5e53e29bf56042fc82ca7c",
        "code": 33253204,
        "category": {
            "_id": "5b5e53dc9bf56042fc8279a8",
            "description": "Abrazaderas P.V.C.",
            "__v": 0
        },
        "description": "ABRAZ.PVC.SAL.ROSC.D/BULON 110x19mm"
    },
    {
        "_id": "5b5e53e29bf56042fc82ca86",
        "code": 33253303,
        "category": {
            "_id": "5b5e53dc9bf56042fc8279a8",
            "description": "Abrazaderas P.V.C.",
            "__v": 0
        },
        "description": "ABRAZ.PVC.SAL.ROSC.D/BULON 125x13mm"
    },
    {
        "_id": "5b5e53e29bf56042fc82ca8b",
        "code": 33253304,
        "category": {
            "_id": "5b5e53dc9bf56042fc8279a8",
            "description": "Abrazaderas P.V.C.",
            "__v": 0
        },
        "description": "ABRAZ.PVC.SAL.ROSC.D/BULON 125x19mm"
    },
    {
        "_id": "5b5e53e29bf56042fc82ca90",
        "code": 33253503,
        "category": {
            "_id": "5b5e53dc9bf56042fc8279a8",
            "description": "Abrazaderas P.V.C.",
            "__v": 0
        },
        "description": "ABRAZ.PVC.SAL.ROSC.D/BULON 160x13mm"
    },
    {
        "_id": "5b5e53e29bf56042fc82ca95",
        "code": 33253504,
        "category": {
            "_id": "5b5e53dc9bf56042fc8279a8",
            "description": "Abrazaderas P.V.C.",
            "__v": 0
        },
        "description": "ABRAZ.PVC.SAL.ROSC.D/BULON 160x19mm"
    },
    {
        "_id": "5b5e53e29bf56042fc82ca4a",
        "code": 33252603,
        "category": {
            "_id": "5b5e53dc9bf56042fc8279a8",
            "description": "Abrazaderas P.V.C.",
            "__v": 0
        },
        "description": "ABRAZ.PVC.SAL.ROSC.D/BULON 40x13 mm"
    },
    {
        "_id": "5b5e53e29bf56042fc82ca4f",
        "code": 33252604,
        "category": {
            "_id": "5b5e53dc9bf56042fc8279a8",
            "description": "Abrazaderas P.V.C.",
            "__v": 0
        },
        "description": "ABRAZ.PVC.SAL.ROSC.D/BULON 40x19 mm"
    },
    {
        "_id": "5b5e53e29bf56042fc82ca54",
        "code": 33252803,
        "category": {
            "_id": "5b5e53dc9bf56042fc8279a8",
            "description": "Abrazaderas P.V.C.",
            "__v": 0
        },
        "description": "ABRAZ.PVC.SAL.ROSC.D/BULON 50x13 mm"
    },
    {
        "_id": "5b5e53e29bf56042fc82ca59",
        "code": 33252804,
        "category": {
            "_id": "5b5e53dc9bf56042fc8279a8",
            "description": "Abrazaderas P.V.C.",
            "__v": 0
        },
        "description": "ABRAZ.PVC.SAL.ROSC.D/BULON 50x19 mm"
    },
    {
        "_id": "5b5e53e29bf56042fc82ca5e",
        "code": 33252903,
        "category": {
            "_id": "5b5e53dc9bf56042fc8279a8",
            "description": "Abrazaderas P.V.C.",
            "__v": 0
        },
        "description": "ABRAZ.PVC.SAL.ROSC.D/BULON 63x13 mm"
    },
    {
        "_id": "5b5e53e29bf56042fc82ca63",
        "code": 33252904,
        "category": {
            "_id": "5b5e53dc9bf56042fc8279a8",
            "description": "Abrazaderas P.V.C.",
            "__v": 0
        },
        "description": "ABRAZ.PVC.SAL.ROSC.D/BULON 63x19 mm"
    },
    {
        "_id": "5b5e53e29bf56042fc82ca68",
        "code": 33253003,
        "category": {
            "_id": "5b5e53dc9bf56042fc8279a8",
            "description": "Abrazaderas P.V.C.",
            "__v": 0
        },
        "description": "ABRAZ.PVC.SAL.ROSC.D/BULON 75x13 mm"
    },
    {
        "_id": "5b5e53e29bf56042fc82ca6d",
        "code": 33253004,
        "category": {
            "_id": "5b5e53dc9bf56042fc8279a8",
            "description": "Abrazaderas P.V.C.",
            "__v": 0
        },
        "description": "ABRAZ.PVC.SAL.ROSC.D/BULON 75x19 mm"
    },
    {
        "_id": "5b5e53e29bf56042fc82ca72",
        "code": 33253103,
        "category": {
            "_id": "5b5e53dc9bf56042fc8279a8",
            "description": "Abrazaderas P.V.C.",
            "__v": 0
        },
        "description": "ABRAZ.PVC.SAL.ROSC.D/BULON 90x13 mm"
    },
    {
        "_id": "5b5e53e29bf56042fc82ca77",
        "code": 33253104,
        "category": {
            "_id": "5b5e53dc9bf56042fc8279a8",
            "description": "Abrazaderas P.V.C.",
            "__v": 0
        },
        "description": "ABRAZ.PVC.SAL.ROSC.D/BULON 90x19 mm"
    },
    {
        "_id": "5b5e53e29bf56042fc82ce1e",
        "code": 33740357,
        "category": {
            "_id": "5b5e53dc9bf56042fc8279b9",
            "description": "Canaletas Pvc",
            "__v": 0
        },
        "description": "ABRAZADERA P/TUBO BAJA.88 mm.AB-512"
    },
    {
        "_id": "5b5e53e29bf56042fc82ca2c",
        "code": 33251103,
        "category": {
            "_id": "5b5e53dc9bf56042fc8279a8",
            "description": "Abrazaderas P.V.C.",
            "__v": 0
        },
        "description": "ABRAZADERA PVC.ROSCADA     90x13 mm"
    },
    {
        "_id": "5b5e53e29bf56042fc82ca31",
        "code": 33251104,
        "category": {
            "_id": "5b5e53dc9bf56042fc8279a8",
            "description": "Abrazaderas P.V.C.",
            "__v": 0
        },
        "description": "ABRAZADERA PVC.ROSCADA     90x19 mm"
    },
    {
        "_id": "5b5e53e29bf56042fc82ca36",
        "code": 33251203,
        "category": {
            "_id": "5b5e53dc9bf56042fc8279a8",
            "description": "Abrazaderas P.V.C.",
            "__v": 0
        },
        "description": "ABRAZADERA PVC.ROSCADA    110x13 mm"
    }
];

class UsersTableContainer extends Component{
  constructor() {
    super();
    this.getData = this.getData.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  componentWillMount() {
    this.props.getUsers();
  }

  createUser(values) {
    this.props.createUser(values);
  }

  getData() {
    return mockData.map(art => {
      art.actions = [
        <button key='delete' className="btn btn-outline-danger btn-block">
            <i className="fa fa-trash"></i>
        </button>
      ];
      return art;
    })
  }
  
  render(){
    return(
        <div className="container-fluid">
            <div className="card border mb-3">
              <div className="card-header border">List of articles</div>
              <div className="card-body text">
                <button data-target="#add-user-modal" data-toggle="modal" className="btn btn-success mb-2">
                  <i className="fas fa-plus pr-1"></i>
                  Add
                </button>
                <BootstrapTable keyField='_id' data={this.getData()} striped hover bootstrap4 columns={[{
                    dataField: '_id',
                    text: 'ID'
                  }, 
                  {
                    dataField: 'code',
                    text: 'Code'
                  }, 
                  {
                    dataField: 'category.description',
                    text: 'Category'
                  }, 
                  {
                    dataField: 'description',
                    text: 'Description'
                  }, 
                  {
                    dataField: 'actions',
                    text: 'Actions',
                    classes:'d-flex justify-content-start'
                  }]}>
                </BootstrapTable>
              </div>
            </div>
            <ModalComponent 
              name="add-user-modal"
              title="CREATE USER"
            >
              <ProfileFormComponent onSubmit={this.createUser} mode="create" buttonsPosition="end"></ProfileFormComponent>
            </ModalComponent>
        </div>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.appReducer.showSpinner,
    users: state.userReducer.users
  }), // mapStateToProps
  dispatch => bindActionCreators({getUsers, createUser, deleteUser},dispatch) // mapDispatchToProps
)(UsersTableContainer)