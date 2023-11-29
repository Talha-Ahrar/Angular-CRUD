using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Aim_Sol.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ProductsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("GetAllProducts")]
        public IActionResult GetAllProducts()
        {
            try
            {
                List<Dictionary<string, object>> productList = new List<Dictionary<string, object>>();

                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    using (SqlCommand command = new SqlCommand("sp_GetAllProducts", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                var product = new Dictionary<string, object>();

                                for (int i = 0; i < reader.FieldCount; i++)
                                {
                                    product[reader.GetName(i)] = reader[i];
                                }

                                productList.Add(product);
                            }
                        }
                    }
                }

                return Ok(productList);
            }
            catch (Exception ex)
            {
                // Handle exceptions and return an appropriate response
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        [HttpPost("CreateProduct")]
        public IActionResult CreateProduct([FromBody] ProductModel product)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand("sp_CreateProduct", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@ProductName", product.ProductName);
                        command.Parameters.AddWithValue("@Price", product.Price);
                        command.Parameters.AddWithValue("@StockQuantity", product.StockQuantity);
                        command.Parameters.AddWithValue("@CreateBy", 1);

                        command.ExecuteNonQuery();
                    }
                }

                return Ok("Product created successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error creating product: {ex.Message}");
            }
        }


        [HttpGet("DeleteProduct")]
        public IActionResult DeleteProduct(int productId)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand("sp_DeleteProduct", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@ProductID", productId);
                        command.Parameters.AddWithValue("@ModifyBy", 1); // You may replace "Admin" with the actual user or modify as needed

                        command.ExecuteNonQuery();
                    }
                }

                return Ok(new { message = "Product deleted successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error deleting product: {ex.Message}");
            }
        }



        [HttpGet("GetProductById")]
        public IActionResult GetProductById(int productId)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand("sp_GetProductById", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@ProductID", productId);

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                var product = new Dictionary<string, object>();

                                for (int i = 0; i < reader.FieldCount; i++)
                                {
                                    product[reader.GetName(i)] = reader[i];
                                }

                                return Ok(product);
                            }
                            else
                            {
                                // Product not found
                                return NotFound();
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        [HttpPut("UpdateProduct")]
        public IActionResult UpdateProduct([FromBody] UpdateProductModel updateProduct)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand("sp_UpdateProduct", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@ProductID", updateProduct.ProductID);
                        command.Parameters.AddWithValue("@ProductName", updateProduct.ProductName);
                        command.Parameters.AddWithValue("@Price", updateProduct.Price);
                        command.Parameters.AddWithValue("@StockQuantity", updateProduct.StockQuantity);
                        command.Parameters.AddWithValue("@ModifyBy", 1); // You may replace "Admin" with the actual user or modify as needed

                        command.ExecuteNonQuery();
                    }
                }

                return Ok("Product updated successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error updating product: {ex.Message}");
            }
        }
    }

}
