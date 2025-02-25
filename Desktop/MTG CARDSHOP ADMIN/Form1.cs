using Newtonsoft.Json;
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

namespace MTG_CARDSHOP_ADMIN
{
    public partial class Form1 : Form
    {
        string eventsBaseURL = "http://localhost:3000/desktop/admin/events";
        List<Event> events = new List<Event>();

        public Form1()
        {
            InitializeComponent();
        }

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

            radioButtonLight.Checked = true;
        }

        private async Task getEvents()
        {
            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync(eventsBaseURL);
            if (response.IsSuccessStatusCode)
            {
                string json = await response.Content.ReadAsStringAsync();
                events = Event.FromJson(json);
            }
        }

        private void dataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            int index = e.RowIndex;
            if (index >= 0)
            {
                DataGridViewRow selectedRow = dataGridViewEvents.Rows[index];
                textBoxId.Text = selectedRow.Cells["EventId"].Value.ToString();
                textBoxName.Text = selectedRow.Cells["EventName"].Value.ToString();
                textBoxDate.Text = selectedRow.Cells["EventDate"].Value.ToString();
                textBoxCurrent.Text = selectedRow.Cells["CurrentParticipants"].Value.ToString();
                textBoxDescription.Text = selectedRow.Cells["EventDescription"].Value.ToString();
                numericUpDownMax.Value = Convert.ToDecimal(selectedRow.Cells["MaxParticipants"].Value);
            }
        }
    }
}
