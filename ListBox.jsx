class ListBox extends React.Component
{
    constructor(props)
    {
        super(props);

        this.valuePropertyName = props && props.valuePropertyName ? props.valuePropertyName : 'value';
        this.textPropertyName = props && props.textPropertyName ? props.textPropertyName : 'text';
    }

    render() 
    {
        return (
            <div className="listBox">
                <select onChange={this.OnChange.bind(this)} ref='listBox'>
                    <option value="-1" disabled selected hidden>{this.props.placeholder}</option>
                    {this.props.Items.map((item, i) => <ListBoxItem Item={{ 'Text': item[this.textPropertyName], 'Value': item[this.valuePropertyName] }} />)}
                </select>
            </div>
        ); 
    }

    componentDidUpdate(nextProps, nextState)
    {
        var select = this.refs.listBox;
        if (select)
        {
            select.value = this.props.selectedValue;
            this.props.OnSelect(select.value);
        }
    }

    OnChange(event)
    {
        this.props.OnSelect(event.target.value, event.target.options[event.target.selectedIndex].text);
    }
}

class ListBoxItem extends React.Component
{
    render() 
    {
        return (
            <option key={this.props.Item.Value} value={this.props.Item.Value}>{this.props.Item.Text}</option>
        );
    }
}

