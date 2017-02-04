var USER_DATA = {
    name: 'Alex Rosa',
    username: 'arosa81',
    image: 'https://avatars0.githubusercontent.com/u/12665908?v=3&s=400'
}

var React = require('react');
var ReactDOM = require('react-dom');

var ProfilePic = React.createClass({
    render: function () {
        console.log(this.props);
        return <img src={this.props.imageURL} alt="github logo" style={{height: 100, width: 100}} />
    }
});

var Link = React.createClass ({
    changeURL: function () {
        window.location.replace(this.props.href);
    },
    render: function () {
        return (
            <span 
            style={{color: 'blue', cursor: 'pointer'}}
            onClick={this.changeURL}>
                {this.props.children}
            </span>
        )
    }
})

var ProfileLink = React.createClass({
    render: function () {
        return (
            <div>
                <Link href={'https://www.github.com/' + this.props.username}>
                    {this.props.username}
                </Link>
            </div>
        )
    }
});

var ProfileName = React.createClass ({
    render: function () {
        return (
            <div>{this.props.name}</div>
        )
    }
});

var Avatar = React.createClass({
    render: function () {
        return (
            <div>
                <ProfilePic imageURL={this.props.user.image} />
                <ProfileName name={this.props.user.name} />
                <ProfileLink username={this.props.user.username} />
            </div>
        )
    }
})

ReactDOM.render(
    <Avatar user={USER_DATA} />,
    document.getElementById('app')
);