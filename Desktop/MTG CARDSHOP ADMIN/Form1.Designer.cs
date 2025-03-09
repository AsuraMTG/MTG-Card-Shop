
namespace MTG_CARDSHOP_ADMIN
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.Windows.Forms.DataVisualization.Charting.ChartArea chartArea6 = new System.Windows.Forms.DataVisualization.Charting.ChartArea();
            System.Windows.Forms.DataVisualization.Charting.Legend legend6 = new System.Windows.Forms.DataVisualization.Charting.Legend();
            System.Windows.Forms.DataVisualization.Charting.Series series6 = new System.Windows.Forms.DataVisualization.Charting.Series();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            this.chartParticipants = new System.Windows.Forms.DataVisualization.Charting.Chart();
            this.pictureBoxLogo = new System.Windows.Forms.PictureBox();
            this.radioButtonLight = new System.Windows.Forms.RadioButton();
            this.radioButtonDark = new System.Windows.Forms.RadioButton();
            this.dataGridViewEvents = new System.Windows.Forms.DataGridView();
            this.textBoxEventId = new System.Windows.Forms.TextBox();
            this.labelEventId = new System.Windows.Forms.Label();
            this.labelEventName = new System.Windows.Forms.Label();
            this.textBoxEventName = new System.Windows.Forms.TextBox();
            this.groupBoxEvent = new System.Windows.Forms.GroupBox();
            this.dateTimePickerEventDate = new System.Windows.Forms.DateTimePicker();
            this.buttonEventNew = new System.Windows.Forms.Button();
            this.buttonEventUpdate = new System.Windows.Forms.Button();
            this.buttonEventDelete = new System.Windows.Forms.Button();
            this.buttonEventCreate = new System.Windows.Forms.Button();
            this.textBoxEventCurrent = new System.Windows.Forms.TextBox();
            this.labelEventDescription = new System.Windows.Forms.Label();
            this.textBoxEventDescription = new System.Windows.Forms.TextBox();
            this.labelEventCurrentParticipants = new System.Windows.Forms.Label();
            this.numericUpDownEventMax = new System.Windows.Forms.NumericUpDown();
            this.labelEventMaxParticipants = new System.Windows.Forms.Label();
            this.labelEventDate = new System.Windows.Forms.Label();
            this.groupBoxNav = new System.Windows.Forms.GroupBox();
            this.radioButtonProducts = new System.Windows.Forms.RadioButton();
            this.radioButtonCustomers = new System.Windows.Forms.RadioButton();
            this.radioButtonEvents = new System.Windows.Forms.RadioButton();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.dataGridViewCustomers = new System.Windows.Forms.DataGridView();
            this.groupBoxCustomers = new System.Windows.Forms.GroupBox();
            this.labelCustomerEmail = new System.Windows.Forms.Label();
            this.textBoxCustomerEmail = new System.Windows.Forms.TextBox();
            this.buttonCustomerUpdate = new System.Windows.Forms.Button();
            this.buttonCustomerDelete = new System.Windows.Forms.Button();
            this.labelCustomerId = new System.Windows.Forms.Label();
            this.labelCustomerName = new System.Windows.Forms.Label();
            this.textBoxCustomerId = new System.Windows.Forms.TextBox();
            this.textBoxCustomerName = new System.Windows.Forms.TextBox();
            this.pictureBoxHELP = new System.Windows.Forms.PictureBox();
            ((System.ComponentModel.ISupportInitialize)(this.chartParticipants)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBoxLogo)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridViewEvents)).BeginInit();
            this.groupBoxEvent.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.numericUpDownEventMax)).BeginInit();
            this.groupBoxNav.SuspendLayout();
            this.groupBox1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridViewCustomers)).BeginInit();
            this.groupBoxCustomers.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBoxHELP)).BeginInit();
            this.SuspendLayout();
            // 
            // chartParticipants
            // 
            this.chartParticipants.AccessibleRole = System.Windows.Forms.AccessibleRole.None;
            this.chartParticipants.BackColor = System.Drawing.SystemColors.Control;
            this.chartParticipants.BorderlineColor = System.Drawing.SystemColors.Control;
            this.chartParticipants.BorderSkin.PageColor = System.Drawing.SystemColors.Control;
            chartArea6.Name = "ChartArea1";
            this.chartParticipants.ChartAreas.Add(chartArea6);
            legend6.Name = "Legend1";
            this.chartParticipants.Legends.Add(legend6);
            this.chartParticipants.Location = new System.Drawing.Point(584, 186);
            this.chartParticipants.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.chartParticipants.Name = "chartParticipants";
            this.chartParticipants.Palette = System.Windows.Forms.DataVisualization.Charting.ChartColorPalette.Chocolate;
            series6.ChartArea = "ChartArea1";
            series6.Legend = "Legend1";
            series6.Name = "Series1";
            this.chartParticipants.Series.Add(series6);
            this.chartParticipants.Size = new System.Drawing.Size(300, 252);
            this.chartParticipants.TabIndex = 0;
            this.chartParticipants.Text = "chart1";
            this.chartParticipants.Visible = false;
            // 
            // pictureBoxLogo
            // 
            this.pictureBoxLogo.Image = ((System.Drawing.Image)(resources.GetObject("pictureBoxLogo.Image")));
            this.pictureBoxLogo.Location = new System.Drawing.Point(713, 2);
            this.pictureBoxLogo.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.pictureBoxLogo.Name = "pictureBoxLogo";
            this.pictureBoxLogo.Size = new System.Drawing.Size(171, 105);
            this.pictureBoxLogo.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pictureBoxLogo.TabIndex = 5;
            this.pictureBoxLogo.TabStop = false;
            // 
            // radioButtonLight
            // 
            this.radioButtonLight.AutoSize = true;
            this.radioButtonLight.Location = new System.Drawing.Point(5, 27);
            this.radioButtonLight.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.radioButtonLight.Name = "radioButtonLight";
            this.radioButtonLight.Size = new System.Drawing.Size(94, 20);
            this.radioButtonLight.TabIndex = 6;
            this.radioButtonLight.TabStop = true;
            this.radioButtonLight.Text = "Light Mode";
            this.radioButtonLight.UseVisualStyleBackColor = true;
            // 
            // radioButtonDark
            // 
            this.radioButtonDark.AutoSize = true;
            this.radioButtonDark.Location = new System.Drawing.Point(5, 54);
            this.radioButtonDark.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.radioButtonDark.Name = "radioButtonDark";
            this.radioButtonDark.Size = new System.Drawing.Size(95, 20);
            this.radioButtonDark.TabIndex = 7;
            this.radioButtonDark.TabStop = true;
            this.radioButtonDark.Text = "Dark Mode";
            this.radioButtonDark.UseVisualStyleBackColor = true;
            // 
            // dataGridViewEvents
            // 
            this.dataGridViewEvents.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridViewEvents.Location = new System.Drawing.Point(12, 444);
            this.dataGridViewEvents.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.dataGridViewEvents.Name = "dataGridViewEvents";
            this.dataGridViewEvents.RowHeadersVisible = false;
            this.dataGridViewEvents.RowHeadersWidth = 51;
            this.dataGridViewEvents.RowTemplate.Height = 24;
            this.dataGridViewEvents.Size = new System.Drawing.Size(872, 222);
            this.dataGridViewEvents.TabIndex = 8;
            this.dataGridViewEvents.Visible = false;
            this.dataGridViewEvents.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridView1_CellClick);
            // 
            // textBoxEventId
            // 
            this.textBoxEventId.Location = new System.Drawing.Point(115, 30);
            this.textBoxEventId.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.textBoxEventId.Name = "textBoxEventId";
            this.textBoxEventId.ReadOnly = true;
            this.textBoxEventId.Size = new System.Drawing.Size(24, 22);
            this.textBoxEventId.TabIndex = 9;
            // 
            // labelEventId
            // 
            this.labelEventId.AutoSize = true;
            this.labelEventId.Location = new System.Drawing.Point(5, 32);
            this.labelEventId.Name = "labelEventId";
            this.labelEventId.Size = new System.Drawing.Size(23, 16);
            this.labelEventId.TabIndex = 10;
            this.labelEventId.Text = "ID:";
            // 
            // labelEventName
            // 
            this.labelEventName.AutoSize = true;
            this.labelEventName.Location = new System.Drawing.Point(5, 62);
            this.labelEventName.Name = "labelEventName";
            this.labelEventName.Size = new System.Drawing.Size(47, 16);
            this.labelEventName.TabIndex = 12;
            this.labelEventName.Text = "Name:";
            // 
            // textBoxEventName
            // 
            this.textBoxEventName.Location = new System.Drawing.Point(115, 62);
            this.textBoxEventName.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.textBoxEventName.Name = "textBoxEventName";
            this.textBoxEventName.Size = new System.Drawing.Size(169, 22);
            this.textBoxEventName.TabIndex = 11;
            // 
            // groupBoxEvent
            // 
            this.groupBoxEvent.Controls.Add(this.dateTimePickerEventDate);
            this.groupBoxEvent.Controls.Add(this.buttonEventNew);
            this.groupBoxEvent.Controls.Add(this.buttonEventUpdate);
            this.groupBoxEvent.Controls.Add(this.buttonEventDelete);
            this.groupBoxEvent.Controls.Add(this.buttonEventCreate);
            this.groupBoxEvent.Controls.Add(this.textBoxEventCurrent);
            this.groupBoxEvent.Controls.Add(this.labelEventDescription);
            this.groupBoxEvent.Controls.Add(this.textBoxEventDescription);
            this.groupBoxEvent.Controls.Add(this.labelEventCurrentParticipants);
            this.groupBoxEvent.Controls.Add(this.numericUpDownEventMax);
            this.groupBoxEvent.Controls.Add(this.labelEventMaxParticipants);
            this.groupBoxEvent.Controls.Add(this.labelEventDate);
            this.groupBoxEvent.Controls.Add(this.labelEventId);
            this.groupBoxEvent.Controls.Add(this.labelEventName);
            this.groupBoxEvent.Controls.Add(this.textBoxEventId);
            this.groupBoxEvent.Controls.Add(this.textBoxEventName);
            this.groupBoxEvent.Location = new System.Drawing.Point(12, 12);
            this.groupBoxEvent.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.groupBoxEvent.Name = "groupBoxEvent";
            this.groupBoxEvent.Padding = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.groupBoxEvent.Size = new System.Drawing.Size(565, 426);
            this.groupBoxEvent.TabIndex = 13;
            this.groupBoxEvent.TabStop = false;
            this.groupBoxEvent.Text = "Event properties";
            this.groupBoxEvent.Visible = false;
            // 
            // dateTimePickerEventDate
            // 
            this.dateTimePickerEventDate.Location = new System.Drawing.Point(115, 90);
            this.dateTimePickerEventDate.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.dateTimePickerEventDate.Name = "dateTimePickerEventDate";
            this.dateTimePickerEventDate.Size = new System.Drawing.Size(169, 22);
            this.dateTimePickerEventDate.TabIndex = 26;
            // 
            // buttonEventNew
            // 
            this.buttonEventNew.Location = new System.Drawing.Point(9, 393);
            this.buttonEventNew.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.buttonEventNew.Name = "buttonEventNew";
            this.buttonEventNew.Size = new System.Drawing.Size(75, 27);
            this.buttonEventNew.TabIndex = 25;
            this.buttonEventNew.Text = "New";
            this.buttonEventNew.UseVisualStyleBackColor = true;
            this.buttonEventNew.Click += new System.EventHandler(this.buttonEventNew_Click);
            // 
            // buttonEventUpdate
            // 
            this.buttonEventUpdate.Location = new System.Drawing.Point(385, 393);
            this.buttonEventUpdate.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.buttonEventUpdate.Name = "buttonEventUpdate";
            this.buttonEventUpdate.Size = new System.Drawing.Size(75, 27);
            this.buttonEventUpdate.TabIndex = 24;
            this.buttonEventUpdate.Text = "Update";
            this.buttonEventUpdate.UseVisualStyleBackColor = true;
            this.buttonEventUpdate.Click += new System.EventHandler(this.buttonEventUpdate_Click);
            // 
            // buttonEventDelete
            // 
            this.buttonEventDelete.Location = new System.Drawing.Point(467, 393);
            this.buttonEventDelete.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.buttonEventDelete.Name = "buttonEventDelete";
            this.buttonEventDelete.Size = new System.Drawing.Size(75, 27);
            this.buttonEventDelete.TabIndex = 23;
            this.buttonEventDelete.Text = "Delete";
            this.buttonEventDelete.UseVisualStyleBackColor = true;
            this.buttonEventDelete.Click += new System.EventHandler(this.buttonEventDelete_Click);
            // 
            // buttonEventCreate
            // 
            this.buttonEventCreate.Location = new System.Drawing.Point(304, 393);
            this.buttonEventCreate.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.buttonEventCreate.Name = "buttonEventCreate";
            this.buttonEventCreate.Size = new System.Drawing.Size(75, 27);
            this.buttonEventCreate.TabIndex = 14;
            this.buttonEventCreate.Text = "Create";
            this.buttonEventCreate.UseVisualStyleBackColor = true;
            this.buttonEventCreate.Click += new System.EventHandler(this.buttonEventCreate_Click);
            // 
            // textBoxEventCurrent
            // 
            this.textBoxEventCurrent.Location = new System.Drawing.Point(144, 146);
            this.textBoxEventCurrent.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.textBoxEventCurrent.Name = "textBoxEventCurrent";
            this.textBoxEventCurrent.ReadOnly = true;
            this.textBoxEventCurrent.Size = new System.Drawing.Size(29, 22);
            this.textBoxEventCurrent.TabIndex = 22;
            // 
            // labelEventDescription
            // 
            this.labelEventDescription.AutoSize = true;
            this.labelEventDescription.Location = new System.Drawing.Point(5, 176);
            this.labelEventDescription.Name = "labelEventDescription";
            this.labelEventDescription.Size = new System.Drawing.Size(78, 16);
            this.labelEventDescription.TabIndex = 21;
            this.labelEventDescription.Text = "Description:";
            // 
            // textBoxEventDescription
            // 
            this.textBoxEventDescription.Location = new System.Drawing.Point(95, 174);
            this.textBoxEventDescription.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.textBoxEventDescription.Multiline = true;
            this.textBoxEventDescription.Name = "textBoxEventDescription";
            this.textBoxEventDescription.Size = new System.Drawing.Size(447, 149);
            this.textBoxEventDescription.TabIndex = 20;
            // 
            // labelEventCurrentParticipants
            // 
            this.labelEventCurrentParticipants.AutoSize = true;
            this.labelEventCurrentParticipants.Location = new System.Drawing.Point(5, 146);
            this.labelEventCurrentParticipants.Name = "labelEventCurrentParticipants";
            this.labelEventCurrentParticipants.Size = new System.Drawing.Size(124, 16);
            this.labelEventCurrentParticipants.TabIndex = 18;
            this.labelEventCurrentParticipants.Text = "Current participants:";
            // 
            // numericUpDownEventMax
            // 
            this.numericUpDownEventMax.Location = new System.Drawing.Point(144, 118);
            this.numericUpDownEventMax.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.numericUpDownEventMax.Maximum = new decimal(new int[] {
            50,
            0,
            0,
            0});
            this.numericUpDownEventMax.Name = "numericUpDownEventMax";
            this.numericUpDownEventMax.Size = new System.Drawing.Size(69, 22);
            this.numericUpDownEventMax.TabIndex = 17;
            // 
            // labelEventMaxParticipants
            // 
            this.labelEventMaxParticipants.AutoSize = true;
            this.labelEventMaxParticipants.Location = new System.Drawing.Point(5, 121);
            this.labelEventMaxParticipants.Name = "labelEventMaxParticipants";
            this.labelEventMaxParticipants.Size = new System.Drawing.Size(107, 16);
            this.labelEventMaxParticipants.TabIndex = 16;
            this.labelEventMaxParticipants.Text = "Max participants:";
            // 
            // labelEventDate
            // 
            this.labelEventDate.AutoSize = true;
            this.labelEventDate.Location = new System.Drawing.Point(5, 94);
            this.labelEventDate.Name = "labelEventDate";
            this.labelEventDate.Size = new System.Drawing.Size(39, 16);
            this.labelEventDate.TabIndex = 14;
            this.labelEventDate.Text = "Date:";
            // 
            // groupBoxNav
            // 
            this.groupBoxNav.Controls.Add(this.radioButtonProducts);
            this.groupBoxNav.Controls.Add(this.radioButtonCustomers);
            this.groupBoxNav.Controls.Add(this.radioButtonEvents);
            this.groupBoxNav.Location = new System.Drawing.Point(584, 12);
            this.groupBoxNav.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.groupBoxNav.Name = "groupBoxNav";
            this.groupBoxNav.Padding = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.groupBoxNav.Size = new System.Drawing.Size(123, 164);
            this.groupBoxNav.TabIndex = 14;
            this.groupBoxNav.TabStop = false;
            this.groupBoxNav.Text = "Navigation";
            // 
            // radioButtonProducts
            // 
            this.radioButtonProducts.AutoSize = true;
            this.radioButtonProducts.Location = new System.Drawing.Point(5, 76);
            this.radioButtonProducts.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.radioButtonProducts.Name = "radioButtonProducts";
            this.radioButtonProducts.Size = new System.Drawing.Size(81, 20);
            this.radioButtonProducts.TabIndex = 2;
            this.radioButtonProducts.TabStop = true;
            this.radioButtonProducts.Text = "Products";
            this.radioButtonProducts.UseVisualStyleBackColor = true;
            this.radioButtonProducts.CheckedChanged += new System.EventHandler(this.radioButtonProducts_CheckedChanged);
            // 
            // radioButtonCustomers
            // 
            this.radioButtonCustomers.AutoSize = true;
            this.radioButtonCustomers.Location = new System.Drawing.Point(5, 49);
            this.radioButtonCustomers.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.radioButtonCustomers.Name = "radioButtonCustomers";
            this.radioButtonCustomers.Size = new System.Drawing.Size(92, 20);
            this.radioButtonCustomers.TabIndex = 1;
            this.radioButtonCustomers.TabStop = true;
            this.radioButtonCustomers.Text = "Customers";
            this.radioButtonCustomers.UseVisualStyleBackColor = true;
            this.radioButtonCustomers.CheckedChanged += new System.EventHandler(this.radioButtonCustomers_CheckedChanged);
            // 
            // radioButtonEvents
            // 
            this.radioButtonEvents.AutoSize = true;
            this.radioButtonEvents.Location = new System.Drawing.Point(7, 22);
            this.radioButtonEvents.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.radioButtonEvents.Name = "radioButtonEvents";
            this.radioButtonEvents.Size = new System.Drawing.Size(69, 20);
            this.radioButtonEvents.TabIndex = 0;
            this.radioButtonEvents.TabStop = true;
            this.radioButtonEvents.Text = "Events";
            this.radioButtonEvents.UseVisualStyleBackColor = true;
            this.radioButtonEvents.CheckedChanged += new System.EventHandler(this.radioButtonEvents_CheckedChanged);
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.radioButtonDark);
            this.groupBox1.Controls.Add(this.radioButtonLight);
            this.groupBox1.Location = new System.Drawing.Point(713, 87);
            this.groupBox1.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Padding = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.groupBox1.Size = new System.Drawing.Size(168, 89);
            this.groupBox1.TabIndex = 15;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Theme";
            // 
            // dataGridViewCustomers
            // 
            this.dataGridViewCustomers.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridViewCustomers.Location = new System.Drawing.Point(584, 182);
            this.dataGridViewCustomers.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.dataGridViewCustomers.Name = "dataGridViewCustomers";
            this.dataGridViewCustomers.RowHeadersVisible = false;
            this.dataGridViewCustomers.RowHeadersWidth = 51;
            this.dataGridViewCustomers.Size = new System.Drawing.Size(300, 484);
            this.dataGridViewCustomers.TabIndex = 16;
            this.dataGridViewCustomers.Visible = false;
            this.dataGridViewCustomers.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridViewCustomers_CellClick);
            // 
            // groupBoxCustomers
            // 
            this.groupBoxCustomers.Controls.Add(this.pictureBoxHELP);
            this.groupBoxCustomers.Controls.Add(this.labelCustomerEmail);
            this.groupBoxCustomers.Controls.Add(this.textBoxCustomerEmail);
            this.groupBoxCustomers.Controls.Add(this.buttonCustomerUpdate);
            this.groupBoxCustomers.Controls.Add(this.buttonCustomerDelete);
            this.groupBoxCustomers.Controls.Add(this.labelCustomerId);
            this.groupBoxCustomers.Controls.Add(this.labelCustomerName);
            this.groupBoxCustomers.Controls.Add(this.textBoxCustomerId);
            this.groupBoxCustomers.Controls.Add(this.textBoxCustomerName);
            this.groupBoxCustomers.Location = new System.Drawing.Point(12, 12);
            this.groupBoxCustomers.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.groupBoxCustomers.Name = "groupBoxCustomers";
            this.groupBoxCustomers.Padding = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.groupBoxCustomers.Size = new System.Drawing.Size(565, 164);
            this.groupBoxCustomers.TabIndex = 27;
            this.groupBoxCustomers.TabStop = false;
            this.groupBoxCustomers.Text = "Customer properties";
            this.groupBoxCustomers.Visible = false;
            // 
            // labelCustomerEmail
            // 
            this.labelCustomerEmail.AutoSize = true;
            this.labelCustomerEmail.Location = new System.Drawing.Point(5, 90);
            this.labelCustomerEmail.Name = "labelCustomerEmail";
            this.labelCustomerEmail.Size = new System.Drawing.Size(48, 16);
            this.labelCustomerEmail.TabIndex = 27;
            this.labelCustomerEmail.Text = "E-Mail:";
            // 
            // textBoxCustomerEmail
            // 
            this.textBoxCustomerEmail.Location = new System.Drawing.Point(115, 90);
            this.textBoxCustomerEmail.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.textBoxCustomerEmail.Name = "textBoxCustomerEmail";
            this.textBoxCustomerEmail.Size = new System.Drawing.Size(263, 22);
            this.textBoxCustomerEmail.TabIndex = 26;
            // 
            // buttonCustomerUpdate
            // 
            this.buttonCustomerUpdate.Location = new System.Drawing.Point(115, 132);
            this.buttonCustomerUpdate.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.buttonCustomerUpdate.Name = "buttonCustomerUpdate";
            this.buttonCustomerUpdate.Size = new System.Drawing.Size(75, 27);
            this.buttonCustomerUpdate.TabIndex = 24;
            this.buttonCustomerUpdate.Text = "Update";
            this.buttonCustomerUpdate.UseVisualStyleBackColor = true;
            // 
            // buttonCustomerDelete
            // 
            this.buttonCustomerDelete.Location = new System.Drawing.Point(196, 132);
            this.buttonCustomerDelete.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.buttonCustomerDelete.Name = "buttonCustomerDelete";
            this.buttonCustomerDelete.Size = new System.Drawing.Size(75, 27);
            this.buttonCustomerDelete.TabIndex = 23;
            this.buttonCustomerDelete.Text = "Delete";
            this.buttonCustomerDelete.UseVisualStyleBackColor = true;
            // 
            // labelCustomerId
            // 
            this.labelCustomerId.AutoSize = true;
            this.labelCustomerId.Location = new System.Drawing.Point(5, 32);
            this.labelCustomerId.Name = "labelCustomerId";
            this.labelCustomerId.Size = new System.Drawing.Size(23, 16);
            this.labelCustomerId.TabIndex = 10;
            this.labelCustomerId.Text = "ID:";
            // 
            // labelCustomerName
            // 
            this.labelCustomerName.AutoSize = true;
            this.labelCustomerName.Location = new System.Drawing.Point(5, 62);
            this.labelCustomerName.Name = "labelCustomerName";
            this.labelCustomerName.Size = new System.Drawing.Size(47, 16);
            this.labelCustomerName.TabIndex = 12;
            this.labelCustomerName.Text = "Name:";
            // 
            // textBoxCustomerId
            // 
            this.textBoxCustomerId.Location = new System.Drawing.Point(115, 30);
            this.textBoxCustomerId.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.textBoxCustomerId.Name = "textBoxCustomerId";
            this.textBoxCustomerId.ReadOnly = true;
            this.textBoxCustomerId.Size = new System.Drawing.Size(24, 22);
            this.textBoxCustomerId.TabIndex = 9;
            // 
            // textBoxCustomerName
            // 
            this.textBoxCustomerName.Location = new System.Drawing.Point(115, 62);
            this.textBoxCustomerName.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.textBoxCustomerName.Name = "textBoxCustomerName";
            this.textBoxCustomerName.Size = new System.Drawing.Size(263, 22);
            this.textBoxCustomerName.TabIndex = 11;
            // 
            // pictureBoxHELP
            // 
            this.pictureBoxHELP.BackColor = System.Drawing.SystemColors.MenuHighlight;
            this.pictureBoxHELP.Location = new System.Drawing.Point(9, 20);
            this.pictureBoxHELP.Name = "pictureBoxHELP";
            this.pictureBoxHELP.Size = new System.Drawing.Size(564, 139);
            this.pictureBoxHELP.TabIndex = 28;
            this.pictureBoxHELP.TabStop = false;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(893, 677);
            this.Controls.Add(this.groupBoxCustomers);
            this.Controls.Add(this.dataGridViewCustomers);
            this.Controls.Add(this.groupBoxEvent);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.groupBoxNav);
            this.Controls.Add(this.dataGridViewEvents);
            this.Controls.Add(this.pictureBoxLogo);
            this.Controls.Add(this.chartParticipants);
            this.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.Name = "Form1";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "MTG CARD SHOP ADMIN";
            this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.chartParticipants)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBoxLogo)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridViewEvents)).EndInit();
            this.groupBoxEvent.ResumeLayout(false);
            this.groupBoxEvent.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.numericUpDownEventMax)).EndInit();
            this.groupBoxNav.ResumeLayout(false);
            this.groupBoxNav.PerformLayout();
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridViewCustomers)).EndInit();
            this.groupBoxCustomers.ResumeLayout(false);
            this.groupBoxCustomers.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBoxHELP)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.DataVisualization.Charting.Chart chartParticipants;
        private System.Windows.Forms.PictureBox pictureBoxLogo;
        private System.Windows.Forms.RadioButton radioButtonLight;
        private System.Windows.Forms.RadioButton radioButtonDark;
        private System.Windows.Forms.DataGridView dataGridViewEvents;
        private System.Windows.Forms.TextBox textBoxEventId;
        private System.Windows.Forms.Label labelEventId;
        private System.Windows.Forms.Label labelEventName;
        private System.Windows.Forms.TextBox textBoxEventName;
        private System.Windows.Forms.GroupBox groupBoxEvent;
        private System.Windows.Forms.Label labelEventMaxParticipants;
        private System.Windows.Forms.Label labelEventDate;
        private System.Windows.Forms.NumericUpDown numericUpDownEventMax;
        private System.Windows.Forms.Label labelEventCurrentParticipants;
        private System.Windows.Forms.Label labelEventDescription;
        private System.Windows.Forms.TextBox textBoxEventDescription;
        private System.Windows.Forms.TextBox textBoxEventCurrent;
        private System.Windows.Forms.Button buttonEventUpdate;
        private System.Windows.Forms.Button buttonEventDelete;
        private System.Windows.Forms.Button buttonEventCreate;
        private System.Windows.Forms.Button buttonEventNew;
        private System.Windows.Forms.GroupBox groupBoxNav;
        private System.Windows.Forms.RadioButton radioButtonProducts;
        private System.Windows.Forms.RadioButton radioButtonCustomers;
        private System.Windows.Forms.RadioButton radioButtonEvents;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.DateTimePicker dateTimePickerEventDate;
        private System.Windows.Forms.DataGridView dataGridViewCustomers;
        private System.Windows.Forms.GroupBox groupBoxCustomers;
        private System.Windows.Forms.Button buttonCustomerUpdate;
        private System.Windows.Forms.Button buttonCustomerDelete;
        private System.Windows.Forms.Label labelCustomerId;
        private System.Windows.Forms.Label labelCustomerName;
        private System.Windows.Forms.TextBox textBoxCustomerId;
        private System.Windows.Forms.TextBox textBoxCustomerName;
        private System.Windows.Forms.Label labelCustomerEmail;
        private System.Windows.Forms.TextBox textBoxCustomerEmail;
        private System.Windows.Forms.PictureBox pictureBoxHELP;
    }
}

