var React = require('react');
var {ListItem, Styles, Avatar} = require('material-ui')
var BlogActions = require('../../actions/BlogActions');
var { Colors, Spacing, Typography} = Styles;

var history = require('../common/history');

var BlogRow = React.createClass({

    render: function () {
        return (
            this._createItems(this.props.blog)
        );
    },

    _onTouchTap: function (permaLink) {
      history.replaceState(null, '/blogs/' + permaLink);
    },

    _createItems: function (blogs) {
        var children;
        if (blogs.out_Own) {
            children = blogs.out_Own.map(function (child) {
                return this._createItems(child);
            }.bind(this));
        }
        return (
            <ListItem
                key={blogs.ID}
                value={blogs.PERMA_LINK}
                leftAvatar={this._getLeftAvatar(blogs)}
                primaryText={blogs.TITLE}
                secondaryText={blogs.DESCRIPTION}
                onTouchTap={this._onTouchTap.bind(this, blogs.PERMA_LINK)}>{children}</ListItem>
        );
    },

    _getLeftAvatar: function(blogs) {
        var count = "0";
        if (blogs.out_HasPost != null && blogs.out_HasPost.length > 0) {
            count = blogs.out_HasPost.length.toString();
        }
        return (
            <div className="blogLeftAvatar">{count}</div>
        );
    }
});

module.exports = BlogRow;
