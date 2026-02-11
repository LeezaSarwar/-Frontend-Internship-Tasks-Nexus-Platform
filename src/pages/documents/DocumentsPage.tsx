import React, { useState, useRef } from 'react';
import { FileText, Upload, Download, Trash2, Share2, Eye, PenTool, CheckCircle, Clock, FileCheck } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import SignatureCanvas from 'react-signature-canvas';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import toast from 'react-hot-toast';

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  shared: boolean;
  status: 'Draft' | 'In Review' | 'Signed';
  signedBy?: string;
}

export const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: 'Investment Agreement.pdf',
      type: 'PDF',
      size: '2.4 MB',
      lastModified: '2024-02-15',
      shared: true,
      status: 'Signed',
      signedBy: 'John Investor'
    },
    {
      id: 2,
      name: 'Term Sheet.pdf',
      type: 'PDF',
      size: '1.8 MB',
      lastModified: '2024-02-10',
      shared: false,
      status: 'In Review'
    },
    {
      id: 3,
      name: 'NDA Document.pdf',
      type: 'PDF',
      size: '3.2 MB',
      lastModified: '2024-02-05',
      shared: true,
      status: 'Draft'
    }
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const signatureRef = useRef<SignatureCanvas>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach(file => {
        const newDoc: Document = {
          id: documents.length + 1,
          name: file.name,
          type: file.type.includes('pdf') ? 'PDF' : 'Document',
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          lastModified: new Date().toISOString().split('T')[0],
          shared: false,
          status: 'Draft'
        };
        setDocuments(prev => [...prev, newDoc]);
      });
      toast.success('Document uploaded successfully!');
      setShowUploadModal(false);
    }
  });

  const handleSignDocument = (doc: Document) => {
    setSelectedDoc(doc);
    setShowSignatureModal(true);
  };

  const handleSaveSignature = () => {
    if (signatureRef.current?.isEmpty()) {
      toast.error('Please provide a signature');
      return;
    }

    if (selectedDoc) {
      setDocuments(prev =>
        prev.map(doc =>
          doc.id === selectedDoc.id
            ? { ...doc, status: 'Signed', signedBy: 'You' }
            : doc
        )
      );
      toast.success('Document signed successfully!');
      setShowSignatureModal(false);
      signatureRef.current?.clear();
    }
  };

  const handleClearSignature = () => {
    signatureRef.current?.clear();
  };

  const handlePreview = (doc: Document) => {
    setSelectedDoc(doc);
    setShowPreview(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft':
        return 'gray';
      case 'In Review':
        return 'warning';
      case 'Signed':
        return 'success';
      default:
        return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Draft':
        return <FileText size={14} />;
      case 'In Review':
        return <Clock size={14} />;
      case 'Signed':
        return <CheckCircle size={14} />;
      default:
        return <FileText size={14} />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Chamber</h1>
          <p className="text-gray-600">Manage contracts, agreements, and e-signatures</p>
        </div>

        <Button leftIcon={<Upload size={18} />} onClick={() => setShowUploadModal(true)}>
          Upload Document
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-gray-100 rounded-lg mr-3">
                <FileText size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Draft</p>
                <p className="text-lg font-semibold text-gray-900">
                  {documents.filter(d => d.status === 'Draft').length}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-warning-100 rounded-lg mr-3">
                <Clock size={20} className="text-warning-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">In Review</p>
                <p className="text-lg font-semibold text-gray-900">
                  {documents.filter(d => d.status === 'In Review').length}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-success-100 rounded-lg mr-3">
                <FileCheck size={20} className="text-success-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Signed</p>
                <p className="text-lg font-semibold text-gray-900">
                  {documents.filter(d => d.status === 'Signed').length}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Document list */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">All Documents</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Sort by Status
            </Button>
            <Button variant="outline" size="sm">
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <div className="space-y-2">
            {documents.map(doc => (
              <div
                key={doc.id}
                className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <div className="p-2 bg-primary-50 rounded-lg mr-4">
                  <FileText size={24} className="text-primary-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {doc.name}
                    </h3>
                    <Badge variant={getStatusColor(doc.status)} size="sm">
                      <span className="flex items-center gap-1">
                        {getStatusIcon(doc.status)}
                        {doc.status}
                      </span>
                    </Badge>
                    {doc.shared && (
                      <Badge variant="secondary" size="sm">Shared</Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    <span>{doc.type}</span>
                    <span>{doc.size}</span>
                    <span>Modified {doc.lastModified}</span>
                    {doc.signedBy && (
                      <span className="text-success-600">Signed by {doc.signedBy}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2"
                    aria-label="Preview"
                    onClick={() => handlePreview(doc)}
                  >
                    <Eye size={18} />
                  </Button>

                  {doc.status !== 'Signed' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 text-primary-600 hover:text-primary-700"
                      aria-label="Sign"
                      onClick={() => handleSignDocument(doc)}
                    >
                      <PenTool size={18} />
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2"
                    aria-label="Download"
                  >
                    <Download size={18} />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2"
                    aria-label="Share"
                  >
                    <Share2 size={18} />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 text-error-600 hover:text-error-700"
                    aria-label="Delete"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Upload Document</h2>
            </CardHeader>
            <CardBody>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'
                }`}
              >
                <input {...getInputProps()} />
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                {isDragActive ? (
                  <p className="text-gray-600">Drop the files here...</p>
                ) : (
                  <>
                    <p className="text-gray-600 mb-2">Drag & drop files here, or click to select</p>
                    <p className="text-sm text-gray-500">Supports PDF, DOC, DOCX files</p>
                  </>
                )}
              </div>
              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1" onClick={() => setShowUploadModal(false)}>
                  Cancel
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Signature Modal */}
      {showSignatureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Sign Document</h2>
              <p className="text-sm text-gray-600 mt-1">Draw your signature below</p>
            </CardHeader>
            <CardBody>
              <div className="border-2 border-gray-300 rounded-lg bg-white">
                <SignatureCanvas
                  ref={signatureRef}
                  canvasProps={{
                    className: 'w-full h-64',
                    style: { width: '100%', height: '256px' }
                  }}
                />
              </div>
              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={handleClearSignature}>
                  Clear
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setShowSignatureModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleSaveSignature}>
                  Save Signature
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && selectedDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl mx-4 max-h-[90vh] overflow-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedDoc.name}</h2>
                  <p className="text-sm text-gray-600 mt-1">Document Preview</p>
                </div>
                <Badge variant={getStatusColor(selectedDoc.status)}>
                  {selectedDoc.status}
                </Badge>
              </div>
            </CardHeader>
            <CardBody>
              <div className="bg-gray-100 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <FileText size={64} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Document preview would appear here</p>
                  <p className="text-sm text-gray-500 mt-2">In a production app, this would show the actual PDF content</p>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1" onClick={() => setShowPreview(false)}>
                  Close
                </Button>
                {selectedDoc.status !== 'Signed' && (
                  <Button className="flex-1" onClick={() => {
                    setShowPreview(false);
                    handleSignDocument(selectedDoc);
                  }}>
                    Sign Document
                  </Button>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};
