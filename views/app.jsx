module.exports = (function () {

    var React = require('react/addons');

    var App = React.createClass({
        getInitialState: function () {
            return { trainID: '' }
        },

        changeTrainID: function (event) {
            this.setState({trainID: event.target.value})
        },

        clickButton: function () {
            var sim = this.props.simulation_state;
            var ui = this.props.ui_state;
            var self = this;

            ui.selected_train = self.state.trainID;
        },

        render: function () {
            var sim = this.props.simulation_state;
            var ui = this.props.ui_state;

            var trainInfo = null;

            if (ui.selected_train) {
                var train;
                sim.trains.forEach(function (train_i) {
                    if (ui.selected_train == train_i.id) {
                        train = train_i;
                    }
                });
                if (train) {
                    trainInfo = (<div>
                        <p>Location: {train.front_loc}</p>
                        <p>Speed: {train.speed} km/h</p>
                        <p>Status: {train.status}</p>
                    </div>);
                }
                else {
                    trainInfo = (this.state.trainID.length > 0) ? (<p>Train not found.</p>) : '';
                }
            }

            return (
                <div>
                    <div>
                        <input type="text" value={this.state.trainID} onChange={this.changeTrainID} />
                        <button onClick={this.clickButton}>OK</button>
                    {trainInfo ? trainInfo : ''}
                    </div>
                </div>
            );
        }
    });

    return App;
})();