import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import 'antd/dist/antd.css'; 


import Dialog from 'react-dialog'



const queryJson = '{"query": "{ projects {edges  {node {name id   dateCreation plans {edges {node {id name}}} members{id username} }}}}"}'



export class DDProjectList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            openDialog: false,
            export_type: "",
            email: "",
        }
    }

    handleCloseDialog = () => {
            this.setState({
                openDialog: false
            })
    }

    handleCreate = () => {

    }
    createExport = () => {
        const exportJson = `{"query": "mutation CreateExport($input:CreateExportInput!){createExport(input:$input){export{id}}}", "variables": {"input": { "planId": "MapPlan:${event.target.getAttribute("data-mapId")}", "parameters": {"layer": "ORTHOMOSAIC", "emails": "${event.target.getAttribute("data-email")}" }} }}`

        fetch('https://www.dronedeploy.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + '09317ba567104fea8c347ba6c976ee61'
            },
            body: exportJson
        }).then( response => response.json())
          .then(data => {
              console.log(data)
              console.log("Sucess Created");
          })
          .catch(err => console.log(err));
    }

    handleOnClick = (event) => {

        this.setState({
            openDialog: true
        })

        
    }

    componentDidMount() {
        fetch('https://www.dronedeploy.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + '09317ba567104fea8c347ba6c976ee61'
            },
            body: queryJson
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const fetched_data =  data.data.projects.edges;
                const projects_data = [];
                for(const project_info of fetched_data){


                    let project = {
                        project_id: project_info["node"]["id"].split(":")[1],
                        project_name: project_info["node"]["name"],
                        map_id: [...project_info["node"]["plans"]["edges"]].pop()["node"]["id"].split(":")[1],
                        project_creation_time: project_info["node"]["dateCreation"].split("T")[0],
                        project_type:  project_info["node"]["members"][0]["username"] === "yz2729@cornell.edu" ? "Self-Hold" : "Official Demo"
                        
                    }
                    if(project_info["node"]["members"].length > 0 && project_info["node"]["members"][0]["username"] === "yz2729@cornell.edu"){
                        // projects_data.push(project_info.node);
                        project["exportable"] = true
                        project["user_email"] =  project_info["node"]["members"][0]["username"]
                    } else {
                        project["exportable"] = false
                    }
                    projects_data.push(project);
                }
                console.log(projects_data)
                this.setState({ projects: projects_data});
            })
            .catch(err => console.log(err));
    }


    render() {

        return (
            <Fragment>
                <div >
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        {
                            this.state.projects.length > 0 ?
                                <tbody>
                                    {
                                        this.state.projects.map((project) => (
                                            <Fragment key={project.project_id}>
                                                <tr>
                                                    <td>
                                                        
                                                        <a target="_blank"  href={`https://www.dronedeploy.com/app2/sites/${project.project_id}/maps/${project.map_id}`}> {project.project_name} </a>
                                                    </td>
                                                    <td>{project.project_type}</td>
                                                    <td>{project.project_creation_time}</td>
                                                    <td> 
                                                        {   project.exportable ? 
                                                            <button  data-mapId={project.map_id} data-email={project.user_email} onClick={(event)=>{
                                                                console.log("Download")
                                                                this.handleOnClick(event)
                                                            }}> Download  Assets </button> :
                                                            <span >Not Support Exportation</span>
                                                        }
                                                        
                                                    </td>
                                                </tr>
                                            </Fragment>
                                        ))}
                                </tbody>
                                : <p>Fetching data from DD……</p>
                        }

                

                    </table>

                </div>
    
           
            

            </Fragment>
        );
    }
}



export default DDProjectList;