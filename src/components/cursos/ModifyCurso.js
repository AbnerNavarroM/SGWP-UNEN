import React, { Component } from 'react';
import './ModifyCurso.css';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux';
import { Button } from 'react-materialize';
import { ModifyParalelo } from '../../store/actions/AccionesParalelo';

class ModifyCurso extends Component {

    constructor(props) {
        super(props);
        this.state= {
        }
    }

    onChange = (e) => {
        this.setState({
            // paralelo: { ...this.state.paralelo, [e.target.id]: e.target.value }
            [e.target.id]: e.target.value 
        });
    }

    onChangeNumber = (e) =>{
        this.setState({
            [e.target.id] : parseInt(e.target.value),
        })
    }

    GuardarCambios = (e) => {
        e.preventDefault();
        let objParalelo = {
            idParalelo : this.props.id,
            nombreParalelo : this.state.nombreParalelo ? this.state.nombreParalelo : this.props.paralelo.nombreParalelo,
            descripcion : this.state.descripcion ? this.state.descripcion : this.props.paralelo.descripcion,
            creditos : this.state.creditos ? this.state.creditos : this.props.paralelo.creditos,
            frecuenciaSemanal : this.state.frecuenciaSemanal ? this.state.frecuenciaSemanal : this.props.paralelo.frecuenciaSemanal,
            costoTotal : this.state.costoTotal ? this.state.costoTotal : this.props.paralelo.costoTotal,
            docente : this.state.docente ? this.state.docente : this.props.paralelo.docente,
        }

        this.props.AnhadirParalelo(objParalelo);
    }

    render() {
        const { paralelo } = this.props;
        return (
            <div className="container-fluid ">
                <div className="container TituloCurso">
                    <div className="row nombreParalelo" style={{ textAlign: "center" }}>
                        <h4>{paralelo && paralelo.nombreParalelo}</h4>
                    </div>
                </div>

                <section className="container ModificarCurso">
                    <form onSubmit={this.GuardarCambios}>
                        <div className="row">
                            <div className="col s12 m4">
                                <p>Nombre Paralelo: </p>
                            </div>
                            <div className="col s12 m6">
                                <input type="text" onChange={this.onChange} id="nombreParalelo" defaultValue={paralelo && paralelo.nombreParalelo} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s12 m4">
                                <p>Descripción: </p>
                            </div>
                            <div className="col s12 m8">
                                <textarea onChange={this.onChange} id="descripcion" defaultValue={paralelo && paralelo.descripcion} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s12 m4">
                                <p>Nombre Docente: </p>
                            </div>
                            <div className="col s12 m6">
                                <input type="text" onChange={this.onChange} id="docente" defaultValue={paralelo && paralelo.docente} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s12 m4 ">
                                <p>Costo Total: </p>
                            </div>
                            <div className="col s1">
                                <p>C$</p>
                            </div>
                            <div className="col s12 m2 valorCurso">
                                <input type="number" onChange={this.onChangeNumber} id="costoTotal"
                                defaultValue={paralelo && paralelo.costoTotal} 
                                />
                            </div>
                            <div className="col s1 puntoDecimalCostoTotal">
                                <p>.00</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s12 m4 ">
                                <p>Créditos: </p>
                            </div>
                            <div className="col s12 m2">
                                <input type="number" onChange={this.onChangeNumber} id="creditos"
                                    defaultValue={paralelo && paralelo.creditos}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s12 m4 ">
                                <p>Frecuencias Semanales: </p>
                            </div>
                            <div className="col s12 m2">
                                <input type="number" onChange={this.onChangeNumber} id="frecuenciaSemanal"
                                    defaultValue={paralelo && paralelo.frecuenciaSemanal}
                                />
                            </div>
                        </div>

                        <div className="row BotonesDiv">
                            <div className="col s12 m4 ">
                                <Button
                                    type="submit"
                                    onClick={() => this.GuardarCambios}
                                >
                                    Guardar Cambios
                                </Button>
                            </div>
                            {/* <div className="col s12 m2">
                            <input type="number" onChange={this.onChange} id="creditos" 
                            defaultValue={paralelo && paralelo.frecuenciaSemanal} 
                            />
                        </div> */}
                        </div>
                    </form>
                </section>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const paralelosData = state.firestore.data.paralelosConvocados;
    let paralelo;
    (paralelosData) ?
        paralelo = paralelosData[id]
        :
        paralelo = null;
    return {
        paralelo,
        id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        AnhadirParalelo: (paralelo) => dispatch(ModifyParalelo(paralelo))
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {
            collection: 'paralelosConvocados'
        }
    ])
)(ModifyCurso)
