using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Windows.Forms.DataVisualization.Charting;

namespace MTG_CARDSHOP_ADMIN
{
    public partial class Form1 : Form
    {
        public string eventsBaseURL = "http://localhost:3000/desktop/admin/events";
        public string customersBaseURL = "http://localhost:3000/desktop/admin/customers";

        List<Event> events = new List<Event>();
        List<Customer> customers = new List<Customer>();

        readonly HttpClient client = new HttpClient();

        public bool eventShowHide = true;

        public Form1()
        {
            InitializeComponent();
        }
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
        private async void Form1_Load(object sender, EventArgs e)
        {
            await getEvents();
            await getCustomers();
            // Events view settings
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

            // Customers view settings
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

            dataGridViewCustomers.Hide();
            this.Controls.Add(dataGridViewCustomers);

            groupBoxCustomers.Hide();
            this.Controls.Add(groupBoxCustomers);


            pictureBoxHELP.Hide();
            this.Controls.Add(pictureBoxHELP);

            radioButtonLight.Checked = true;
            radioButtonEvents.Checked = true;


            dateTimePickerEventDate.Format = DateTimePickerFormat.Custom;
            dateTimePickerEventDate.CustomFormat = "yyyy-MM-dd HH:mm";

            AddDataToChart();

            this.FormBorderStyle = FormBorderStyle.FixedDialog;

            // Maximalizálás gomb letiltása
            this.MaximizeBox = false;

            // Minimalizálás gomb letiltása
            this.MinimizeBox = false;

            // Ezen kívül, ha azt is szeretnéd, hogy a form ne legyen átméretezhető, 
            // akkor a következő módon is biztosíthatod: 686; 589
            this.Resize += (s, args) => { this.Size = new Size(686, 589); };

        }

        //Adatok beállítása
        public void adatokSet()
        {
            textBoxEventId.Text = "";
            textBoxEventName.Text = "";
            dateTimePickerEventDate.Value = DateTime.Now;
            numericUpDownEventMax.Value = 0;
            textBoxEventCurrent.Text = "0";
            textBoxEventDescription.Text = "";
        }

        //Űrlap feltöltese
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

        //NEW event
        private void buttonEventNew_Click(object sender, EventArgs e)
        {
            adatokSet();
            AddDataToChart();
        }

        //Create event
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

        //Read events
        private async Task getEvents()
        {
            HttpResponseMessage response = await client.GetAsync(eventsBaseURL);
            if (response.IsSuccessStatusCode)
            {
                string json = await response.Content.ReadAsStringAsync();
                events = Event.FromJson(json);
            }
        }

        



        //Update event
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

            if (MessageBox.Show("Biztosan frissíteni szeretné a felhasználót?", "Frissítés", MessageBoxButtons.YesNo) == DialogResult.Yes)
            {
                updateUser(id, name, date, max, description);
            }

            AddDataToChart();
        }
        private async void updateUser(decimal id, string name, string date, decimal max, string description)
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

        //Delete event
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

        //Events Show/Hide
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
            }
        }

        private async Task getCustomers()
        {
            HttpResponseMessage response = await client.GetAsync(customersBaseURL);
            if (response.IsSuccessStatusCode)
            {
                string json = await response.Content.ReadAsStringAsync();
                customers = Customer.FromJson(json);
            }
        }

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

        private void radioButtonProducts_CheckedChanged(object sender, EventArgs e)
        {
            if (radioButtonProducts.Checked == false)
            {
                pictureBoxHELP.Hide();
            }
            else
            {
                pictureBoxHELP.Show();
            }
        }

        public void adatokSetCustomer()
        {
            textBoxCustomerEmail.Text = "";
            textBoxCustomerId.Text = "";
            textBoxCustomerName.Text = "";
        }

        private void buttonCustomerUpdate_Click(object sender, EventArgs e)
        {

        }

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
    }
}
