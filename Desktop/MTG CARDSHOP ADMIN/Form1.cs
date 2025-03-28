using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Windows.Forms.DataVisualization.Charting;

namespace MTG_CARDSHOP_ADMIN
{
    public partial class Form1 : Form
    {
        // -------------------* Variables

        public string eventsBaseURL = "http://localhost:3000/events";
        public string customersBaseURL = "http://localhost:3000/customers";
        public string productsBaseURL = "http://localhost:3000/products";



        // -------------------* Lists

        List<Event> events = new List<Event>();
        List<Customer> customers = new List<Customer>();
        List<Product> products = new List<Product>();

        readonly HttpClient client = new HttpClient();

        public bool eventShowHide = true;

        public Form1()
        {
            InitializeComponent();
        }

        // -------------------* Form Load
        private async void Form1_Load(object sender, EventArgs e)
        {
            await getEvents();

            dataGridViewEvents.DataSource = events;
            dataGridViewEvents.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
            dataGridViewEvents.MultiSelect = false;
            dataGridViewEvents.ReadOnly = true;
            dataGridViewEvents.AllowUserToAddRows = false;
            dataGridViewEvents.AllowUserToDeleteRows = false;
            dataGridViewEvents.AllowUserToResizeRows = false;
            dataGridViewEvents.AllowUserToResizeColumns = false;
            dataGridViewEvents.AllowUserToOrderColumns = false;

            foreach (DataGridViewColumn column in dataGridViewEvents.Columns)
            {
                column.AutoSizeMode = DataGridViewAutoSizeColumnMode.Fill;
            }

            await getCustomers();

            dataGridViewCustomers.DataSource = customers;
            dataGridViewCustomers.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
            dataGridViewCustomers.MultiSelect = false;
            dataGridViewCustomers.ReadOnly = true;
            dataGridViewCustomers.AllowUserToAddRows = false;
            dataGridViewCustomers.AllowUserToDeleteRows = false;
            dataGridViewCustomers.AllowUserToResizeRows = false;
            dataGridViewCustomers.AllowUserToResizeColumns = false;
            dataGridViewCustomers.AllowUserToOrderColumns = false;

            foreach (DataGridViewColumn column in dataGridViewCustomers.Columns)
            {
                column.AutoSizeMode = DataGridViewAutoSizeColumnMode.Fill;
            }

            await getProducts();

            dataGridViewProducts.DataSource = products;
            dataGridViewProducts.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
            dataGridViewProducts.MultiSelect = false;
            dataGridViewProducts.ReadOnly = true;
            dataGridViewProducts.AllowUserToAddRows = false;
            dataGridViewProducts.AllowUserToDeleteRows = false;
            dataGridViewProducts.AllowUserToResizeRows = false;
            dataGridViewProducts.AllowUserToResizeColumns = false;
            dataGridViewProducts.AllowUserToOrderColumns = false;

            foreach (DataGridViewColumn column in dataGridViewProducts.Columns)
            {
                column.AutoSizeMode = DataGridViewAutoSizeColumnMode.Fill;
            }

            dataGridViewCustomers.Hide();
            this.Controls.Add(dataGridViewCustomers);

            groupBoxCustomers.Hide();
            this.Controls.Add(groupBoxCustomers);

            groupBoxProducts.Hide();
            this.Controls.Add(groupBoxProducts);

            radioButtonLight.Checked = true;
            radioButtonEvents.Checked = true;

            pictureBoxProductImage.SizeMode = PictureBoxSizeMode.Zoom;

            dateTimePickerEventDate.Format = DateTimePickerFormat.Custom;
            dateTimePickerEventDate.CustomFormat = "yyyy-MM-dd HH:mm";

            AddDataToChart();

            this.FormBorderStyle = FormBorderStyle.FixedDialog;

            this.MaximizeBox = false;

            this.MinimizeBox = false;

            this.Resize += (s, args) => { this.Size = new Size(686, 589); };


            comboBoxProductCategory.Items.Add("Booster");
            comboBoxProductCategory.Items.Add("Display");
            comboBoxProductCategory.Items.Add("Boundle");
            comboBoxProductCategory.Items.Add("Commander Deck");
        }



        // --------------------* Event Section Start

        // ----* Chart event
        private void AddDataToChart()
        {
            chartParticipants.Series.Clear();

            var series = new Series
            {
                Name = "Participants",
                ChartType = SeriesChartType.Column,
                BorderWidth = 3
            };

            foreach (DataGridViewRow row in dataGridViewEvents.Rows)
            {
                if (row.IsNewRow) continue;

                string name = row.Cells[1].Value.ToString();
                int participants = Convert.ToInt32(row.Cells[5].Value);

                series.Points.AddXY(name, participants);
            }
            chartParticipants.Series.Add(series);

            chartParticipants.ChartAreas[0].AxisY.LabelStyle.Format = "0";
            chartParticipants.ChartAreas[0].AxisY.Interval = 1;


        }

        // ----* Adatok beállítása event
        public void adatokSet()
        {
            textBoxEventId.Text = "";
            textBoxEventName.Text = "";
            dateTimePickerEventDate.Value = DateTime.Now;
            numericUpDownEventMax.Value = 0;
            textBoxEventCurrent.Text = "0";
            textBoxEventDescription.Text = "";
        }

        // ----* Űrlap feltöltese event
        private void dataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            int index = e.RowIndex;
            if (index >= 0)
            {
                DataGridViewRow selectedRow = dataGridViewEvents.Rows[index];
                textBoxEventId.Text = selectedRow.Cells["EventId"].Value.ToString();
                textBoxEventName.Text = selectedRow.Cells["EventName"].Value.ToString();
                dateTimePickerEventDate.Value = ((DateTimeOffset)selectedRow.Cells["EventDate"].Value).DateTime;
                textBoxEventCurrent.Text = selectedRow.Cells["CurrentParticipants"].Value.ToString();
                textBoxEventDescription.Text = selectedRow.Cells["EventDescription"].Value.ToString();
                numericUpDownEventMax.Value = Convert.ToDecimal(selectedRow.Cells["MaxParticipants"].Value);
            }

            AddDataToChart();
        }

        // ----* New event
        private void buttonEventNew_Click(object sender, EventArgs e)
        {
            adatokSet();
            AddDataToChart();
        }

        // ----* Create event
        private async void buttonEventCreate_Click(object sender, EventArgs e)
        {
            string name = textBoxEventName.Text;
            string date = dateTimePickerEventDate.Value.ToString("yyyy-MM-dd HH:mm");
            decimal max = numericUpDownEventMax.Value;
            string description = textBoxEventDescription.Text;

            if (name.Length == 0)
            {
                MessageBox.Show("Név megadása kötelező!");
                return;
            }

            var content = new StringContent($"{{\"event_name\":\"{name}\",\"event_date\":\"{date}\",\"event_description\":\"{description}\",\"max_participants\":\"{max}\"}}", Encoding.UTF8, "application/json");
            
            try
            {
                HttpResponseMessage result = await client.PostAsync(eventsBaseURL, content);
                if (result.IsSuccessStatusCode)
                {
                    MessageBox.Show("Sikeres feltöltés!");
                    await getEvents();
                    dataGridViewEvents.DataSource = events;
                }
                else
                {
                    MessageBox.Show("Hiba a feltöltés során!");
                }
            }
            catch (HttpRequestException ex)
            {
                MessageBox.Show(ex.Message);
                throw;
            }

            AddDataToChart();
        }

        // ----* Read events
        private async Task getEvents()
        {
            HttpResponseMessage response = await client.GetAsync(eventsBaseURL);
            if (response.IsSuccessStatusCode)
            {
                string json = await response.Content.ReadAsStringAsync();
                events = Event.FromJson(json);
            }
        }

        // ----* Update event
        private void buttonEventUpdate_Click(object sender, EventArgs e)
        {

            decimal id = Convert.ToInt32(textBoxEventId.Text);
            string name = textBoxEventName.Text;
            string date = dateTimePickerEventDate.Value.ToString("yyyy-MM-dd HH:mm");
            decimal max = numericUpDownEventMax.Value;
            string description = textBoxEventDescription.Text;

            if (name.Length == 0)
            {
                MessageBox.Show("Név megadása kötelező!");
                return;
            }

            if (MessageBox.Show("Biztosan frissíteni szeretné az Eseményt?", "Frissítés", MessageBoxButtons.YesNo) == DialogResult.Yes)
            {
                updateEvent(id, name, date, max, description);
            }

            AddDataToChart();
        }
        private async void updateEvent(decimal id, string name, string date, decimal max, string description)
        {
            try
            {
                var content = new StringContent($"{{\"event_name\":\"{name}\",\"event_date\":\"{date}\",\"event_description\":\"{description}\",\"max_participants\":\"{max}\"}}", Encoding.UTF8, "application/json");

                HttpResponseMessage result = await client.PutAsync($"{eventsBaseURL}/{id}", content);

                if (result.IsSuccessStatusCode)
                {
                    MessageBox.Show("Sikeres frissítés!");
                    await getEvents();
                    dataGridViewEvents.DataSource = events;
                    adatokSet();
                }
                else
                {
                    MessageBox.Show("Hiba a frissítés során!");
                }
            }
            catch (HttpRequestException ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        // ----* Delete event
        private void buttonEventDelete_Click(object sender, EventArgs e)
        {
            string id = textBoxEventId.Text;
            if (id.Length == 0)
            {
                MessageBox.Show("Nincs kiválasztva Event!");
                return;
            }
            if (MessageBox.Show("Biztosan törölni szeretné az Eventet?", "Törlés", MessageBoxButtons.YesNo) == DialogResult.Yes)
            {
                deleteEvent(id);
            }

            AddDataToChart();
        }
        private async void deleteEvent(string id)
        {
            try
            {
                HttpResponseMessage result = await client.DeleteAsync($"{eventsBaseURL}/{id}");
                if (result.IsSuccessStatusCode)
                {
                    MessageBox.Show("Sikeres törlés!");
                    await getEvents();
                    dataGridViewEvents.DataSource = events;
                    adatokSet();
                }
                else
                {
                    MessageBox.Show("Hiba a törlés során!");
                }
            }
            catch (HttpRequestException ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        // ----* Events Show/Hide
        private void radioButtonEvents_CheckedChanged(object sender, EventArgs e)
        {
            if (radioButtonEvents.Checked == false)
            {
                groupBoxEvent.Hide();
                dataGridViewEvents.Hide();
                chartParticipants.Hide();
            }
            else
            {
                groupBoxEvent.Show();
                dataGridViewEvents.Show();
                chartParticipants.Show();
                adatokSet();
                AddDataToChart();
            }

        }

        // ----* Customers Show/Hide
        private void radioButtonCustomers_CheckedChanged(object sender, EventArgs e)
        {
            if (radioButtonCustomers.Checked == false)
            {
                dataGridViewCustomers.Hide();
                groupBoxCustomers.Hide();
            }
            else
            {
                dataGridViewCustomers.Show();
                groupBoxCustomers.Show();
                adatokSetCustomer();
            }
        }

        // ----* Products Show/Hide
        private void radioButtonProducts_CheckedChanged(object sender, EventArgs e)
        {
            if (radioButtonProducts.Checked == false)
            {
                pictureBoxProductImage.Hide();
                groupBoxProducts.Hide();
                dataGridViewProducts.Hide();
            }
            else
            {
                pictureBoxProductImage.Show();
                groupBoxProducts.Show();
                dataGridViewProducts.Show();
                adatokSetProduct();
            }
        }



        // --------------------* Customer Section Start

        // ----* Read customers
        private async Task getCustomers()
        {
            HttpResponseMessage response = await client.GetAsync(customersBaseURL);
            if (response.IsSuccessStatusCode)
            {
                string json = await response.Content.ReadAsStringAsync();
                customers = Customer.FromJson(json);
            }
        }

        // ----* Űrlap feltöltese customer
        private void dataGridViewCustomers_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            int index = e.RowIndex;
            if (index >= 0)
            {
                DataGridViewRow selectedRow = dataGridViewCustomers.Rows[index];
                textBoxCustomerId.Text = selectedRow.Cells["CustomerId"].Value.ToString();
                textBoxCustomerName.Text = selectedRow.Cells["Name"].Value.ToString();
                textBoxCustomerEmail.Text = selectedRow.Cells["Email"].Value.ToString();
                textBoxCustomerAddress.Text = selectedRow.Cells["Address"].Value.ToString();
                textBoxCustomerPhone.Text = selectedRow.Cells["PhoneNumber"].Value.ToString();
                textBoxCustomerRegistration.Text = selectedRow.Cells["RegistrationDate"].Value.ToString();
            }
        }

        // ----* Adatok beállítása customer
        public void adatokSetCustomer()
        {
            textBoxCustomerEmail.Text = "";
            textBoxCustomerId.Text = "";
            textBoxCustomerName.Text = "";
            textBoxCustomerPhone.Text = "";
            textBoxCustomerRegistration.Text = "";
            textBoxCustomerAddress.Text = "";
        }

        // ----* Update customer
        private void buttonCustomerUpdate_Click(object sender, EventArgs e)
        {
            decimal id = Convert.ToInt32(textBoxCustomerId.Text);
            string name = textBoxCustomerName.Text;
            string email = textBoxCustomerEmail.Text;
            string address = textBoxCustomerAddress.Text;
            string phoneNumber = textBoxCustomerPhone.Text;

            if (MessageBox.Show("Biztosan frissíteni szeretné a felhasználót?", "Frissítés", MessageBoxButtons.YesNo) == DialogResult.Yes)
            {
                updateCustomer(id, name, email, address, phoneNumber);
            }

        }
        private async void updateCustomer(decimal id, string name, string email, string address, string phoneNumber)
        {
            try
            {
                var content = new StringContent($"{{\"name\":\"{name}\",\"email\":\"{email}\",\"address\":\"{address}\",\"phone_number\":\"{phoneNumber}\"}}", Encoding.UTF8, "application/json");

                HttpResponseMessage result = await client.PutAsync($"{customersBaseURL}/{id}", content);

                if (result.IsSuccessStatusCode)
                {
                    MessageBox.Show("Sikeres frissítés!");
                    await getCustomers();
                    dataGridViewCustomers.DataSource = customers;
                    adatokSetCustomer();
                }
                else
                {
                    MessageBox.Show("Hiba a frissítés során!");
                }
            }
            catch (HttpRequestException ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        // ----* Delete customer
        private void buttonCustomerDelete_Click(object sender, EventArgs e)
        {
            string id = textBoxCustomerId.Text;
            if (id.Length == 0)
            {
                MessageBox.Show("Nincs kiválasztva Customer!");
                return;
            }
            if (MessageBox.Show("Biztosan törölni szeretné a Customert?", "Törlés", MessageBoxButtons.YesNo) == DialogResult.Yes)
            {
                deleteCustomer(id);
            }
        }
        private async void deleteCustomer(string id)
        {
            try
            {
                HttpResponseMessage result = await client.DeleteAsync($"{customersBaseURL}/{id}");
                if (result.IsSuccessStatusCode)
                {
                    MessageBox.Show("Sikeres törlés!");
                    await getCustomers();
                    dataGridViewCustomers.DataSource = customers;
                    adatokSetCustomer();
                }
                else
                {
                    MessageBox.Show("Hiba a törlés során!");
                }
            }
            catch (HttpRequestException ex)
            {
                MessageBox.Show(ex.Message);
            }
        }



        // --------------------* Product Section Start

        // ----* Adatok beállítása product
        public void adatokSetProduct()
        {
            textBoxProductAvailable.Text = "";
            textBoxProductDescription.Text = "";
            textBoxProductName.Text = "";
            textBoxProductPrice.Text = "";
            textBoxProductStock.Text = "";
            textBoxProductId.Text = "";
            comboBoxProductCategory.Text = "";
            pictureBoxProductImage.Image = null;
        }

        // ----* Read products
        private async Task getProducts()
        {
            HttpResponseMessage response = await client.GetAsync(productsBaseURL);
            if (response.IsSuccessStatusCode)
            {
                string json = await response.Content.ReadAsStringAsync();
                products = Product.FromJson(json);
            }
        }

        // ----* Űrlap feltöltese product
        private void dataGridViewProducts_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            int index = e.RowIndex;
            if (index >= 0)
            {
                DataGridViewRow selectedRow = dataGridViewProducts.Rows[index];
                
                string imageUrl = $"http://localhost:3000/image/{selectedRow.Cells["ImageUrl"].Value}";
                
                pictureBoxProductImage.Load(imageUrl);
                buttonProductImageUpload.Hide();
                textBoxProductId.Text = selectedRow.Cells["ProductId"].Value.ToString();
                textBoxProductName.Text = selectedRow.Cells["Name"].Value.ToString();
                textBoxProductAvailable.Text = selectedRow.Cells["Available"].Value.ToString();
                textBoxProductPrice.Text = selectedRow.Cells["Price"].Value.ToString().Split('.')[0];
                textBoxProductStock.Text = selectedRow.Cells["StockQuantity"].Value.ToString();
                textBoxProductDescription.Text = selectedRow.Cells["Description"].Value.ToString();
                int categoryId = Convert.ToInt32(selectedRow.Cells["CategoryId"].Value);

                comboBoxProductCategory.SelectedIndex = categoryId - 1;
                comboBoxProductCategory.Text = comboBoxProductCategory.Items[categoryId - 1].ToString();
            }
        }

        // ----* New product
        private void buttonProductNew_Click(object sender, EventArgs e)
        {
            adatokSetProduct();
            buttonProductImageUpload.Show();
        }

        // ----* Create product
        public string filePath;
        private Image FromFile(string fileName)
        {
            return Image.FromFile(fileName);
        }
        private async void buttonProductCreate_Click(object sender, EventArgs e)
        {
            string name = textBoxProductName.Text;
            int category = comboBoxProductCategory.SelectedIndex + 1;
            int price = Convert.ToInt32(textBoxProductPrice.Text);
            int stock = Convert.ToInt32(textBoxProductStock.Text);
            int available = Convert.ToInt32(textBoxProductAvailable.Text);
            string description = textBoxProductDescription.Text;

            string formattedDescription = description.Replace("\\n", Environment.NewLine);

            using (var client = new HttpClient())
            {
                using (var formData = new MultipartFormDataContent())
                {
                    var fileContent = new ByteArrayContent(File.ReadAllBytes(filePath));
                    fileContent.Headers.ContentType = MediaTypeHeaderValue.Parse("image/jpeg");
                    formData.Add(fileContent, "image", Path.GetFileName(filePath));

                    formData.Add(new StringContent(name), "name");
                    formData.Add(new StringContent(category.ToString()), "category_id");
                    formData.Add(new StringContent(price.ToString()), "price");
                    formData.Add(new StringContent(stock.ToString()), "stock_quantity");
                    formData.Add(new StringContent(available.ToString()), "available");
                    formData.Add(new StringContent(formattedDescription), "description");

                    try
                    {
                        HttpResponseMessage result = await client.PostAsync(productsBaseURL, formData);

                        if (result.IsSuccessStatusCode)
                        {
                            MessageBox.Show("Sikeres feltöltés!");
                            await getProducts();
                            dataGridViewProducts.DataSource = products;
                        }
                        else
                        {
                            MessageBox.Show("Hiba a feltöltés során!");
                        }
                    }
                    catch (HttpRequestException ex)
                    {
                        MessageBox.Show(ex.Message);
                    }
                }
            }
        }

        // ----* Update product
        private void buttonProductImageUpload_Click(object sender, EventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            openFileDialog.Filter = "Image files (*.jpg, *.jpeg, *.png) | *.jpg; *.jpeg; *.png";
            if (openFileDialog.ShowDialog() == DialogResult.OK)
            {
                pictureBoxProductImage.Image = FromFile(openFileDialog.FileName);
                filePath = openFileDialog.FileName;
            }
            else
                return;
        }
        private void buttonProductUpdate_Click(object sender, EventArgs e)
        {
            decimal id = Convert.ToInt32(textBoxProductId.Text);
            string name = textBoxProductName.Text;
            int category = comboBoxProductCategory.SelectedIndex + 1;
            int price = Convert.ToInt32(textBoxProductPrice.Text);
            int stock = Convert.ToInt32(textBoxProductStock.Text);
            int available = Convert.ToInt32(textBoxProductAvailable.Text);
            string description = textBoxProductDescription.Text;

            if (string.IsNullOrWhiteSpace(name))
            {
                MessageBox.Show("A nev nem lehet üres!");
                return;
            }

            string formattedDescription = System.Text.RegularExpressions.Regex.Replace(description, @"\r\n|\n|\r", "\\n");

            UpdateProduct(id, name, category, price, stock, available, formattedDescription);
        }
        private async void UpdateProduct(decimal id, string name, int category, int price, int stock, int available, string description)
        {
            try
            {
                var content = new StringContent($"{{\"name\":\"{name}\",\"category_id\":\"{category}\",\"price\":\"{price}\",\"stock_quantity\":\"{stock}\",\"available\":\"{available}\",\"description\":\"{description}\"}}", Encoding.UTF8, "application/json");
                MessageBox.Show(description);
                HttpResponseMessage result = await client.PutAsync($"{productsBaseURL}/{id}", content);

                if (result.IsSuccessStatusCode)
                {
                    MessageBox.Show("Sikeres frissítés!");
                    await getProducts();
                    dataGridViewProducts.DataSource = products;
                    adatokSetProduct();
                }
                else
                {
                    MessageBox.Show("Hiba a frissítés során!");
                }
            }
            catch (HttpRequestException ex)
            {
                MessageBox.Show(ex.Message);
            }
        }



        // --------------------* Dark and Light Mode Section Start

        // ----* SetDarkMode
        private void SetDarkMode()
        {
            this.BackColor = Color.FromArgb(45, 45, 48);
            this.ForeColor = Color.White;

            foreach (Control control in this.Controls)
            {
                if (control is GroupBox)
                {
                    GroupBox groupBox = control as GroupBox;
                    groupBox.BackColor = Color.FromArgb(45, 45, 48);
                    groupBox.ForeColor = Color.White;
                }

                if (control is Button)
                {
                    Button button = control as Button;
                    button.BackColor = Color.FromArgb(66, 66, 66);
                    button.ForeColor = Color.White;
                }
                else if (control is TextBox || control is RichTextBox)
                {
                    control.BackColor = Color.FromArgb(28, 28, 28);
                    control.ForeColor = Color.White;
                }
                else if (control is Label)
                {
                    control.ForeColor = Color.White;
                }
                else if (control is ComboBox)
                {
                    control.BackColor = Color.FromArgb(28, 28, 28);
                    control.ForeColor = Color.White;
                }
                else if (control is DataGridView)
                {
                    DataGridView dgv = control as DataGridView;
                    dgv.BackgroundColor = Color.FromArgb(28, 28, 28);
                    dgv.DefaultCellStyle.BackColor = Color.FromArgb(45, 45, 48);
                    dgv.DefaultCellStyle.ForeColor = Color.White;
                    dgv.GridColor = Color.FromArgb(64, 64, 64);
                    dgv.ColumnHeadersDefaultCellStyle.BackColor = Color.FromArgb(28, 28, 28);
                    dgv.ColumnHeadersDefaultCellStyle.ForeColor = Color.White;
                    dgv.RowsDefaultCellStyle.BackColor = Color.FromArgb(45, 45, 48);
                    dgv.AlternatingRowsDefaultCellStyle.BackColor = Color.FromArgb(35, 35, 38);
                }
                else if (control is PictureBox)
                {
                    control.BackColor = Color.FromArgb(45, 45, 48);
                    pictureBoxProductImage.BackColor = Color.FromArgb(45, 45, 48);
                }
            }
        }
        private void radioButtonDark_CheckedChanged(object sender, EventArgs e)
        {
            if (radioButtonDark.Checked)
            {
                SetDarkMode();

                buttonCustomerDelete.BackColor = Color.FromArgb(45, 45, 48);

                buttonCustomerUpdate.BackColor = Color.FromArgb(45, 45, 48);

                buttonEventCreate.BackColor = Color.FromArgb(45, 45, 48);

                buttonEventDelete.BackColor = Color.FromArgb(45, 45, 48);

                buttonEventNew.BackColor = Color.FromArgb(45, 45, 48);

                buttonEventUpdate.BackColor = Color.FromArgb(45, 45, 48);

                buttonProductCreate.BackColor = Color.FromArgb(45, 45, 48);

                buttonProductImageUpload.BackColor = Color.FromArgb(45, 45, 48);

                buttonProductNew.BackColor = Color.FromArgb(45, 45, 48);

                buttonProductUpdate.BackColor = Color.FromArgb(45, 45, 48);

                textBoxCustomerAddress.BackColor = Color.FromArgb(45, 45, 48);
                textBoxCustomerAddress.ForeColor = Color.White;

                textBoxCustomerEmail.BackColor = Color.FromArgb(45, 45, 48);
                textBoxCustomerEmail.ForeColor = Color.White;

                textBoxCustomerId.BackColor = Color.FromArgb(45, 45, 48);
                textBoxCustomerId.ForeColor = Color.White;

                textBoxCustomerName.BackColor = Color.FromArgb(45, 45, 48);
                textBoxCustomerName.ForeColor = Color.White;

                textBoxCustomerPhone.BackColor = Color.FromArgb(45, 45, 48);
                textBoxCustomerPhone.ForeColor = Color.White;

                textBoxCustomerRegistration.BackColor = Color.FromArgb(45, 45, 48);
                textBoxCustomerRegistration.ForeColor = Color.White;

                numericUpDownEventMax.BackColor = Color.FromArgb(45, 45, 48);
                numericUpDownEventMax.ForeColor = Color.White;

                dateTimePickerEventDate.BackColor = Color.FromArgb(45, 45, 48);
                dateTimePickerEventDate.ForeColor = Color.White;

                comboBoxProductCategory.BackColor = Color.FromArgb(45, 45, 48);
                comboBoxProductCategory.ForeColor = Color.White;

                textBoxEventName.BackColor = Color.FromArgb(45, 45, 48);
                textBoxEventName.ForeColor = Color.White;

                textBoxEventCurrent.BackColor = Color.FromArgb(45, 45, 48);
                textBoxEventCurrent.ForeColor = Color.White;

                textBoxEventDescription.BackColor = Color.FromArgb(45, 45, 48);
                textBoxEventDescription.ForeColor = Color.White;

                textBoxEventId.BackColor = Color.FromArgb(45, 45, 48);
                textBoxEventId.ForeColor = Color.White;

                textBoxProductAvailable.BackColor = Color.FromArgb(45, 45, 48);
                textBoxProductAvailable.ForeColor = Color.White;

                textBoxProductDescription.BackColor = Color.FromArgb(45, 45, 48);
                textBoxProductDescription.ForeColor = Color.White;

                textBoxProductId.BackColor = Color.FromArgb(45, 45, 48);
                textBoxProductId.ForeColor = Color.White;

                textBoxProductName.BackColor = Color.FromArgb(45, 45, 48);
                textBoxProductName.ForeColor = Color.White;

                textBoxProductPrice.BackColor = Color.FromArgb(45, 45, 48);
                textBoxProductPrice.ForeColor = Color.White;

                textBoxProductStock.BackColor = Color.FromArgb(45, 45, 48);
                textBoxProductStock.ForeColor = Color.White;

            }
        }

        // ----* SetLightMode
        private void SetLightMode()
        {
            this.BackColor = Color.White;
            this.ForeColor = Color.Black;

            foreach (Control control in this.Controls)
            {
                if (control is GroupBox)
                {
                    GroupBox groupBox = control as GroupBox;
                    groupBox.BackColor = Color.White;
                    groupBox.ForeColor = Color.Black;
                }

                if (control is Button)
                {
                    Button button = control as Button;
                    button.BackColor = Color.LightGray; // Lighter button background
                    button.ForeColor = Color.White; // White text
                }
                else if (control is TextBox || control is RichTextBox)
                {
                    // Apply Light mode for TextBox and RichTextBox
                    control.BackColor = Color.White;
                    control.ForeColor = Color.Black;
                    //control.BorderStyle = BorderStyle.Fixed3D; // Apply a valid border style for these controls
                }
                else if (control is Label)
                {
                    control.ForeColor = Color.Black;
                }
                else if (control is ComboBox)
                {
                    // Apply Light mode for ComboBox (no BorderStyle, just background and text color)
                    control.BackColor = Color.White;
                    control.ForeColor = Color.Black;
                }
                else if (control is DataGridView)
                {
                    DataGridView dgv = control as DataGridView;
                    dgv.BackgroundColor = Color.White;
                    dgv.DefaultCellStyle.BackColor = Color.White;
                    dgv.DefaultCellStyle.ForeColor = Color.Black;
                    dgv.GridColor = Color.Gray;
                    dgv.ColumnHeadersDefaultCellStyle.BackColor = Color.LightGray;
                    dgv.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
                    dgv.RowsDefaultCellStyle.BackColor = Color.White;
                    dgv.AlternatingRowsDefaultCellStyle.BackColor = Color.LightGray;
                }
                else if (control is PictureBox)
                {
                    control.BackColor = Color.White; // Set to light if needed

                    pictureBoxProductImage.BackColor = Color.White;
                }
            }
        }
        private void radioButtonLight_CheckedChanged(object sender, EventArgs e)
        {
            if (radioButtonLight.Checked)
            {
                SetLightMode();

                buttonCustomerDelete.BackColor = Color.White;

                buttonCustomerUpdate.BackColor = Color.White;

                buttonEventCreate.BackColor = Color.White;

                buttonEventDelete.BackColor = Color.White;

                buttonEventNew.BackColor = Color.White;

                buttonEventUpdate.BackColor = Color.White;

                buttonProductCreate.BackColor = Color.White;

                buttonProductImageUpload.BackColor = Color.White;

                buttonProductNew.BackColor = Color.White;

                buttonProductUpdate.BackColor = Color.White;

                textBoxCustomerAddress.BackColor = Color.White;
                textBoxCustomerAddress.ForeColor = Color.Black;

                textBoxCustomerEmail.BackColor = Color.White;
                textBoxCustomerEmail.ForeColor = Color.Black;

                textBoxCustomerId.BackColor = Color.White;
                textBoxCustomerId.ForeColor = Color.Black;

                textBoxCustomerName.BackColor = Color.White;
                textBoxCustomerName.ForeColor = Color.Black;

                textBoxCustomerPhone.BackColor = Color.White;
                textBoxCustomerPhone.ForeColor = Color.Black;

                textBoxCustomerRegistration.BackColor = Color.White;
                textBoxCustomerRegistration.ForeColor = Color.Black;

                numericUpDownEventMax.BackColor = Color.White;
                numericUpDownEventMax.ForeColor = Color.Black;

                dateTimePickerEventDate.BackColor = Color.White;
                dateTimePickerEventDate.ForeColor = Color.Black;

                comboBoxProductCategory.BackColor = Color.White;
                comboBoxProductCategory.ForeColor = Color.Black;

                textBoxEventName.BackColor = Color.White;
                textBoxEventName.ForeColor = Color.Black;

                textBoxEventCurrent.BackColor = Color.White;
                textBoxEventCurrent.ForeColor = Color.Black;

                textBoxEventDescription.BackColor = Color.White;
                textBoxEventDescription.ForeColor = Color.Black;

                textBoxEventId.BackColor = Color.White;
                textBoxEventId.ForeColor = Color.Black;

                textBoxProductAvailable.BackColor = Color.White;
                textBoxProductAvailable.ForeColor = Color.Black;

                textBoxProductDescription.BackColor = Color.White;
                textBoxProductDescription.ForeColor = Color.Black;

                textBoxProductId.BackColor = Color.White;
                textBoxProductId.ForeColor = Color.Black;

                textBoxProductName.BackColor = Color.White;
                textBoxProductName.ForeColor = Color.Black;

                textBoxProductPrice.BackColor = Color.White;
                textBoxProductPrice.ForeColor = Color.Black;

                textBoxProductStock.BackColor = Color.White;
                textBoxProductStock.ForeColor = Color.Black;
            }
        }
    }
}