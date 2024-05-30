import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Card, Row, Col, Form, FormControl, Button, Alert } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2'; // Import Bar from react-chartjs-2

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [placeFilter, setPlaceFilter] = useState('All');

  useEffect(() => {
    // Fetch products data from an API
    // Example:
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://api.example.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data); // Initially set filtered products to all products
    } catch (error) {
      console.error('Error fetching products:', error);
      // Handle error gracefully, e.g., show a message to the user
    }
  };
  

  const filterProducts = () => {
    let filtered = products.filter(product => {
      let categoryMatch = categoryFilter === 'All' || product.category === categoryFilter;
      let placeMatch = placeFilter === 'All' || product.place === placeFilter;
      let searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && placeMatch && searchMatch;
    });
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [searchQuery, categoryFilter, placeFilter]);

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handlePlaceChange = (e) => {
    setPlaceFilter(e.target.value);
  };

  // Sample data for bar chart (replace with your actual data)
  const barChartData = {
    labels: ['Category A', 'Category B', 'Category C', 'Category D', 'Category E'], // Example categories
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56] // Sample sales data
      }
    ]
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Product Dashboard</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#profile">Profile</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="my-4">
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <h5>Filters</h5>
                <Form.Group controlId="categoryFilter">
                  <Form.Label>Category</Form.Label>
                  <Form.Control as="select" onChange={handleCategoryChange}>
                    <option value="All">All</option>
                    {/* Add options dynamically based on available categories */}
                  </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId="placeFilter">
                  <Form.Label>Place</Form.Label>
                  <Form.Control as="select" onChange={handlePlaceChange}>
                    <option value="All">All</option>
                    {/* Add options dynamically based on available places */}
                  </Form.Control>
                </Form.Group>
                <br/>z
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Row>
              {filteredProducts.map(product => (
                <Col key={product.id} md={4}>
                  <Card>
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>Category: {product.category}</Card.Text>
                      <Card.Text>Place: {product.place}</Card.Text>
                      {/* Add more product details */}
                      {product.stock === 0 && <Alert variant="danger">Out of stock</Alert>}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <h5>Data Analysis</h5>
                <Bar
                  data={barChartData}
                  options={{
                    scales: {
                      yAxes: [{
                        ticks: {
                          beginAtZero: true
                        }
                      }]
                    },
                    title:{
                      display:true,
                      text:'Sales Data',
                      fontSize:20
                    },
                    legend:{
                      display:true,
                      position:'right'
                    }
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
