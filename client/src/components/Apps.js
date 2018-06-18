import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getApps } from '../actions/apps';
import { Container, Grid, Header, Card, Image, Dropdown, Divider, Button } from 'semantic-ui-react';
import AppForm from './AppForm'

class Apps extends React.Component {
  state = { category: '', showForm: false }

  toggleForm = () => {
    this.setState( state => {
      return { showForm: !state.showForm }
    })
  }

  apps = () => {
    let { apps } = this.props;
    let { category } = this.state;
    let visible = apps;
    if (category)
      visible = apps.filter( a => a.category === category )

    return visible.map( app =>
    <Card key={app.id}>
      <Image src={app.logo} />
      <Card.Content>
        <Card.Header>
          {app.name}
        </Card.Header>
        <Card.Meta>
          <span>
            {app.author}
          </span>
        </Card.Meta>
        <Card.Description>
          {app.category}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link to={`/apps/${app.id}`}>
          View App
        </Link>
      </Card.Content>
    </Card>
  )
  }

  categoryOptions = () => {
    return this.props.categories.map( (c,i) => { return { key: i, text: c, value: c } })
  }

  render() {
    const { category, showForm } = this.state;
    return (
      <Container>
        <Header as="h3" textAlign="center">Apps</Header>
        <Button onClick={this.toggleForm}>
          { showForm ? 'Hide Form' : 'Show Form' }
        </Button>
        { showForm ?
          <AppForm closeForm={this.toggleForm} />
          :
          <div>
            <Dropdown
              placeholder="Filter by category"
              fluid
              selection
              options={this.categoryOptions()}
              onChange={ (e, data) => this.setState({ category: data.value }) }
              value={category}
            />
            { category && <Button fluid basic onClick={ () => this.setState({ category: '' }) }>Clear Filter: {category}</Button> }
            <Divider />
            <Card.Group itemsPerRow={4}>
              { this.apps() }
            </Card.Group>
          </div>
        }
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const { apps } = state
  const categories = [...new Set(apps.map( a => a.category ))]
  return { apps, categories}
}

export default connect(mapStateToProps)(Apps);