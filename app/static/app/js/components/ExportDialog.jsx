import React from 'react';
import FormDialog from './FormDialog';
import ErrorMessage from './ErrorMessage';
import { _ } from '../classes/gettext';

class ExportDialog extends React.Component {

    constructor(props){
        super(props);

        this.state = {
          export_type: "",
          email: "",
          error: ""
        };

        this.onShow = this.onShow.bind(this);
        this.getFormData = this.getFormData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getFormData(){
        const res = {
            export_type: this.state.export_type,
            email: this.state.email,
        };
        
  
        return res;
      }

  
    onShow(){
      this.nameInput.focus();
    }

    show(){
      this.dialog.show();
    }

    handleChange(field){
      return (e) => {
        let state = {};
        state[field] = e.target.value;
        this.setState(state);
      }
    }


    render(){
        return (
            <FormDialog {...this.props}
                onShow={this.onShow}
                getFormData={this.getFormData}
                ref={(domNode) => { this.dialog = domNode; }}>
              <ErrorMessage bind={[this, "error"]} />
              <div className="form-group">
                <label className="col-sm-2 control-label">{_("Export Type")}</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" ref={(domNode) => { this.nameInput = domNode; }} value={this.state.export_type} onChange={this.handleChange('export_type')} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">{_("Email")}</label>
                <div className="col-sm-10">
                  <textarea className="form-control" rows="3" value={this.state.email} onChange={this.handleChange('email')} />
                </div>
              </div>
            </FormDialog>
        );
    }
}

export default ExportDialog;