
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
            System.Windows.Forms.DataVisualization.Charting.ChartArea chartArea1 = new System.Windows.Forms.DataVisualization.Charting.ChartArea();
            System.Windows.Forms.DataVisualization.Charting.Legend legend1 = new System.Windows.Forms.DataVisualization.Charting.Legend();
            System.Windows.Forms.DataVisualization.Charting.Series series1 = new System.Windows.Forms.DataVisualization.Charting.Series();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            this.chartParticipants = new System.Windows.Forms.DataVisualization.Charting.Chart();
            this.pictureBoxLogo = new System.Windows.Forms.PictureBox();
            this.radioButtonLight = new System.Windows.Forms.RadioButton();
            this.radioButtonDark = new System.Windows.Forms.RadioButton();
            this.dataGridViewEvents = new System.Windows.Forms.DataGridView();
            this.textBoxId = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.textBoxName = new System.Windows.Forms.TextBox();
            this.groupBoxEvent = new System.Windows.Forms.GroupBox();
            this.dateTimePickerDate = new System.Windows.Forms.DateTimePicker();
            this.buttonEventNew = new System.Windows.Forms.Button();
            this.buttonEventUpdate = new System.Windows.Forms.Button();
            this.buttonEventDelete = new System.Windows.Forms.Button();
            this.buttonEventCreate = new System.Windows.Forms.Button();
            this.textBoxCurrent = new System.Windows.Forms.TextBox();
            this.label6 = new System.Windows.Forms.Label();
            this.textBoxDescription = new System.Windows.Forms.TextBox();
            this.label5 = new System.Windows.Forms.Label();
            this.numericUpDownMax = new System.Windows.Forms.NumericUpDown();
            this.label4 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.groupBoxNav = new System.Windows.Forms.GroupBox();
            this.radioButton3 = new System.Windows.Forms.RadioButton();
            this.radioButton2 = new System.Windows.Forms.RadioButton();
            this.radioButtonEvents = new System.Windows.Forms.RadioButton();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            ((System.ComponentModel.ISupportInitialize)(this.chartParticipants)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBoxLogo)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridViewEvents)).BeginInit();
            this.groupBoxEvent.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.numericUpDownMax)).BeginInit();
            this.groupBoxNav.SuspendLayout();
            this.groupBox1.SuspendLayout();
            this.SuspendLayout();
            // 
            // chartParticipants
            // 
            this.chartParticipants.AccessibleRole = System.Windows.Forms.AccessibleRole.None;
            this.chartParticipants.BackColor = System.Drawing.SystemColors.Control;
            this.chartParticipants.BorderlineColor = System.Drawing.SystemColors.Control;
            this.chartParticipants.BorderSkin.PageColor = System.Drawing.SystemColors.Control;
            chartArea1.Name = "ChartArea1";
            this.chartParticipants.ChartAreas.Add(chartArea1);
            legend1.Name = "Legend1";
            this.chartParticipants.Legends.Add(legend1);
            this.chartParticipants.Location = new System.Drawing.Point(438, 151);
            this.chartParticipants.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.chartParticipants.Name = "chartParticipants";
            this.chartParticipants.Palette = System.Windows.Forms.DataVisualization.Charting.ChartColorPalette.Chocolate;
            series1.ChartArea = "ChartArea1";
            series1.Legend = "Legend1";
            series1.Name = "Series1";
            this.chartParticipants.Series.Add(series1);
            this.chartParticipants.Size = new System.Drawing.Size(225, 205);
            this.chartParticipants.TabIndex = 0;
            this.chartParticipants.Text = "chart1";
            // 
            // pictureBoxLogo
            // 
            this.pictureBoxLogo.Image = ((System.Drawing.Image)(resources.GetObject("pictureBoxLogo.Image")));
            this.pictureBoxLogo.Location = new System.Drawing.Point(535, 2);
            this.pictureBoxLogo.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.pictureBoxLogo.Name = "pictureBoxLogo";
            this.pictureBoxLogo.Size = new System.Drawing.Size(128, 85);
            this.pictureBoxLogo.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pictureBoxLogo.TabIndex = 5;
            this.pictureBoxLogo.TabStop = false;
            // 
            // radioButtonLight
            // 
            this.radioButtonLight.AutoSize = true;
            this.radioButtonLight.Location = new System.Drawing.Point(4, 22);
            this.radioButtonLight.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.radioButtonLight.Name = "radioButtonLight";
            this.radioButtonLight.Size = new System.Drawing.Size(78, 17);
            this.radioButtonLight.TabIndex = 6;
            this.radioButtonLight.TabStop = true;
            this.radioButtonLight.Text = "Light Mode";
            this.radioButtonLight.UseVisualStyleBackColor = true;
            // 
            // radioButtonDark
            // 
            this.radioButtonDark.AutoSize = true;
            this.radioButtonDark.Location = new System.Drawing.Point(4, 44);
            this.radioButtonDark.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.radioButtonDark.Name = "radioButtonDark";
            this.radioButtonDark.Size = new System.Drawing.Size(78, 17);
            this.radioButtonDark.TabIndex = 7;
            this.radioButtonDark.TabStop = true;
            this.radioButtonDark.Text = "Dark Mode";
            this.radioButtonDark.UseVisualStyleBackColor = true;
            // 
            // dataGridViewEvents
            // 
            this.dataGridViewEvents.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridViewEvents.Location = new System.Drawing.Point(9, 361);
            this.dataGridViewEvents.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.dataGridViewEvents.Name = "dataGridViewEvents";
            this.dataGridViewEvents.RowHeadersVisible = false;
            this.dataGridViewEvents.RowHeadersWidth = 51;
            this.dataGridViewEvents.RowTemplate.Height = 24;
            this.dataGridViewEvents.Size = new System.Drawing.Size(654, 180);
            this.dataGridViewEvents.TabIndex = 8;
            this.dataGridViewEvents.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridView1_CellClick);
            // 
            // textBoxId
            // 
            this.textBoxId.Location = new System.Drawing.Point(86, 24);
            this.textBoxId.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.textBoxId.Name = "textBoxId";
            this.textBoxId.ReadOnly = true;
            this.textBoxId.Size = new System.Drawing.Size(19, 20);
            this.textBoxId.TabIndex = 9;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(4, 26);
            this.label1.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(21, 13);
            this.label1.TabIndex = 10;
            this.label1.Text = "ID:";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(4, 50);
            this.label2.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(38, 13);
            this.label2.TabIndex = 12;
            this.label2.Text = "Name:";
            // 
            // textBoxName
            // 
            this.textBoxName.Location = new System.Drawing.Point(86, 50);
            this.textBoxName.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.textBoxName.Name = "textBoxName";
            this.textBoxName.Size = new System.Drawing.Size(128, 20);
            this.textBoxName.TabIndex = 11;
            // 
            // groupBoxEvent
            // 
            this.groupBoxEvent.Controls.Add(this.dateTimePickerDate);
            this.groupBoxEvent.Controls.Add(this.buttonEventNew);
            this.groupBoxEvent.Controls.Add(this.buttonEventUpdate);
            this.groupBoxEvent.Controls.Add(this.buttonEventDelete);
            this.groupBoxEvent.Controls.Add(this.buttonEventCreate);
            this.groupBoxEvent.Controls.Add(this.textBoxCurrent);
            this.groupBoxEvent.Controls.Add(this.label6);
            this.groupBoxEvent.Controls.Add(this.textBoxDescription);
            this.groupBoxEvent.Controls.Add(this.label5);
            this.groupBoxEvent.Controls.Add(this.numericUpDownMax);
            this.groupBoxEvent.Controls.Add(this.label4);
            this.groupBoxEvent.Controls.Add(this.label3);
            this.groupBoxEvent.Controls.Add(this.label1);
            this.groupBoxEvent.Controls.Add(this.label2);
            this.groupBoxEvent.Controls.Add(this.textBoxId);
            this.groupBoxEvent.Controls.Add(this.textBoxName);
            this.groupBoxEvent.Location = new System.Drawing.Point(9, 10);
            this.groupBoxEvent.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.groupBoxEvent.Name = "groupBoxEvent";
            this.groupBoxEvent.Padding = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.groupBoxEvent.Size = new System.Drawing.Size(424, 346);
            this.groupBoxEvent.TabIndex = 13;
            this.groupBoxEvent.TabStop = false;
            this.groupBoxEvent.Text = "Event properties";
            // 
            // dateTimePickerDate
            // 
            this.dateTimePickerDate.Location = new System.Drawing.Point(86, 73);
            this.dateTimePickerDate.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.dateTimePickerDate.Name = "dateTimePickerDate";
            this.dateTimePickerDate.Size = new System.Drawing.Size(128, 20);
            this.dateTimePickerDate.TabIndex = 26;
            // 
            // buttonEventNew
            // 
            this.buttonEventNew.Location = new System.Drawing.Point(7, 319);
            this.buttonEventNew.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.buttonEventNew.Name = "buttonEventNew";
            this.buttonEventNew.Size = new System.Drawing.Size(56, 22);
            this.buttonEventNew.TabIndex = 25;
            this.buttonEventNew.Text = "New";
            this.buttonEventNew.UseVisualStyleBackColor = true;
            this.buttonEventNew.Click += new System.EventHandler(this.buttonEventNew_Click);
            // 
            // buttonEventUpdate
            // 
            this.buttonEventUpdate.Location = new System.Drawing.Point(289, 319);
            this.buttonEventUpdate.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.buttonEventUpdate.Name = "buttonEventUpdate";
            this.buttonEventUpdate.Size = new System.Drawing.Size(56, 22);
            this.buttonEventUpdate.TabIndex = 24;
            this.buttonEventUpdate.Text = "Update";
            this.buttonEventUpdate.UseVisualStyleBackColor = true;
            this.buttonEventUpdate.Click += new System.EventHandler(this.buttonEventUpdate_Click);
            // 
            // buttonEventDelete
            // 
            this.buttonEventDelete.Location = new System.Drawing.Point(350, 319);
            this.buttonEventDelete.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.buttonEventDelete.Name = "buttonEventDelete";
            this.buttonEventDelete.Size = new System.Drawing.Size(56, 22);
            this.buttonEventDelete.TabIndex = 23;
            this.buttonEventDelete.Text = "Delete";
            this.buttonEventDelete.UseVisualStyleBackColor = true;
            this.buttonEventDelete.Click += new System.EventHandler(this.buttonEventDelete_Click);
            // 
            // buttonEventCreate
            // 
            this.buttonEventCreate.Location = new System.Drawing.Point(228, 319);
            this.buttonEventCreate.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.buttonEventCreate.Name = "buttonEventCreate";
            this.buttonEventCreate.Size = new System.Drawing.Size(56, 22);
            this.buttonEventCreate.TabIndex = 14;
            this.buttonEventCreate.Text = "Create";
            this.buttonEventCreate.UseVisualStyleBackColor = true;
            this.buttonEventCreate.Click += new System.EventHandler(this.buttonEventCreate_Click);
            // 
            // textBoxCurrent
            // 
            this.textBoxCurrent.Location = new System.Drawing.Point(108, 119);
            this.textBoxCurrent.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.textBoxCurrent.Name = "textBoxCurrent";
            this.textBoxCurrent.ReadOnly = true;
            this.textBoxCurrent.Size = new System.Drawing.Size(23, 20);
            this.textBoxCurrent.TabIndex = 22;
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(4, 143);
            this.label6.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(63, 13);
            this.label6.TabIndex = 21;
            this.label6.Text = "Description:";
            // 
            // textBoxDescription
            // 
            this.textBoxDescription.Location = new System.Drawing.Point(71, 141);
            this.textBoxDescription.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.textBoxDescription.Multiline = true;
            this.textBoxDescription.Name = "textBoxDescription";
            this.textBoxDescription.Size = new System.Drawing.Size(336, 122);
            this.textBoxDescription.TabIndex = 20;
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(4, 119);
            this.label5.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(101, 13);
            this.label5.TabIndex = 18;
            this.label5.Text = "Current participants:";
            // 
            // numericUpDownMax
            // 
            this.numericUpDownMax.Location = new System.Drawing.Point(108, 96);
            this.numericUpDownMax.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.numericUpDownMax.Maximum = new decimal(new int[] {
            50,
            0,
            0,
            0});
            this.numericUpDownMax.Name = "numericUpDownMax";
            this.numericUpDownMax.Size = new System.Drawing.Size(52, 20);
            this.numericUpDownMax.TabIndex = 17;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(4, 98);
            this.label4.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(87, 13);
            this.label4.TabIndex = 16;
            this.label4.Text = "Max participants:";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(4, 76);
            this.label3.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(33, 13);
            this.label3.TabIndex = 14;
            this.label3.Text = "Date:";
            // 
            // groupBoxNav
            // 
            this.groupBoxNav.Controls.Add(this.radioButton3);
            this.groupBoxNav.Controls.Add(this.radioButton2);
            this.groupBoxNav.Controls.Add(this.radioButtonEvents);
            this.groupBoxNav.Location = new System.Drawing.Point(438, 10);
            this.groupBoxNav.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.groupBoxNav.Name = "groupBoxNav";
            this.groupBoxNav.Padding = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.groupBoxNav.Size = new System.Drawing.Size(92, 133);
            this.groupBoxNav.TabIndex = 14;
            this.groupBoxNav.TabStop = false;
            this.groupBoxNav.Text = "Navigation";
            // 
            // radioButton3
            // 
            this.radioButton3.AutoSize = true;
            this.radioButton3.Location = new System.Drawing.Point(4, 62);
            this.radioButton3.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.radioButton3.Name = "radioButton3";
            this.radioButton3.Size = new System.Drawing.Size(85, 17);
            this.radioButton3.TabIndex = 2;
            this.radioButton3.TabStop = true;
            this.radioButton3.Text = "radioButton3";
            this.radioButton3.UseVisualStyleBackColor = true;
            // 
            // radioButton2
            // 
            this.radioButton2.AutoSize = true;
            this.radioButton2.Location = new System.Drawing.Point(4, 40);
            this.radioButton2.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.radioButton2.Name = "radioButton2";
            this.radioButton2.Size = new System.Drawing.Size(85, 17);
            this.radioButton2.TabIndex = 1;
            this.radioButton2.TabStop = true;
            this.radioButton2.Text = "radioButton2";
            this.radioButton2.UseVisualStyleBackColor = true;
            // 
            // radioButtonEvents
            // 
            this.radioButtonEvents.AutoSize = true;
            this.radioButtonEvents.Location = new System.Drawing.Point(5, 18);
            this.radioButtonEvents.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.radioButtonEvents.Name = "radioButtonEvents";
            this.radioButtonEvents.Size = new System.Drawing.Size(58, 17);
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
            this.groupBox1.Location = new System.Drawing.Point(535, 71);
            this.groupBox1.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Padding = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.groupBox1.Size = new System.Drawing.Size(126, 72);
            this.groupBox1.TabIndex = 15;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Theme";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(670, 550);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.groupBoxNav);
            this.Controls.Add(this.groupBoxEvent);
            this.Controls.Add(this.dataGridViewEvents);
            this.Controls.Add(this.pictureBoxLogo);
            this.Controls.Add(this.chartParticipants);
            this.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.Name = "Form1";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "MTG CARD SHOP ADMIN";
            this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.chartParticipants)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBoxLogo)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridViewEvents)).EndInit();
            this.groupBoxEvent.ResumeLayout(false);
            this.groupBoxEvent.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.numericUpDownMax)).EndInit();
            this.groupBoxNav.ResumeLayout(false);
            this.groupBoxNav.PerformLayout();
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.DataVisualization.Charting.Chart chartParticipants;
        private System.Windows.Forms.PictureBox pictureBoxLogo;
        private System.Windows.Forms.RadioButton radioButtonLight;
        private System.Windows.Forms.RadioButton radioButtonDark;
        private System.Windows.Forms.DataGridView dataGridViewEvents;
        private System.Windows.Forms.TextBox textBoxId;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox textBoxName;
        private System.Windows.Forms.GroupBox groupBoxEvent;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.NumericUpDown numericUpDownMax;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.TextBox textBoxDescription;
        private System.Windows.Forms.TextBox textBoxCurrent;
        private System.Windows.Forms.Button buttonEventUpdate;
        private System.Windows.Forms.Button buttonEventDelete;
        private System.Windows.Forms.Button buttonEventCreate;
        private System.Windows.Forms.Button buttonEventNew;
        private System.Windows.Forms.GroupBox groupBoxNav;
        private System.Windows.Forms.RadioButton radioButton3;
        private System.Windows.Forms.RadioButton radioButton2;
        private System.Windows.Forms.RadioButton radioButtonEvents;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.DateTimePicker dateTimePickerDate;
    }
}

