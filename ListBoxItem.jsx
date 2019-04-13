class ListBoxItem extends React.Component
{
    render()
    {
        return (
                <option key={this.props.Item.Value}
                value={this.props.Item.Value}>{this.props.Item.Text}</option>
        );
    }
}